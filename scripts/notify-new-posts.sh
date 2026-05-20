#!/usr/bin/env bash
# Reads a newline-delimited list of added _posts/ file paths from stdin and
# dispatches one OneSignal push notification per post.
#
# Required env vars:
#   ONESIGNAL_APP_ID       - OneSignal App ID (public)
#   ONESIGNAL_REST_API_KEY - OneSignal REST API Key (secret)
#   SITE_URL               - Base URL without trailing slash (e.g. https://aboneto.dev)
#
# Each post may opt out with front-matter: notify: false
# Posts with published: false or a future date are also skipped.

set -euo pipefail

: "${ONESIGNAL_APP_ID:?ONESIGNAL_APP_ID is required}"
: "${ONESIGNAL_REST_API_KEY:?ONESIGNAL_REST_API_KEY is required}"
: "${SITE_URL:?SITE_URL is required}"

TODAY=$(date -u +%Y-%m-%d)

parse_frontmatter() {
  local file="$1" key="$2"
  # Extract value from YAML front matter between --- delimiters
  awk '/^---/{f=!f; next} f && /^'"$key"':/{print; exit}' "$file" \
    | sed "s/^${key}:[[:space:]]*//" \
    | tr -d '"'"'"
}

strip_markdown() {
  # Remove HTML tags, Markdown links/images, emphasis markers, code blocks
  sed 's/<[^>]*>//g' \
    | sed 's/!\[[^]]*\]([^)]*)//g' \
    | sed 's/\[[^]]*\]([^)]*)//g' \
    | sed 's/[*_`#>]//g' \
    | tr -s ' \n\t' ' ' \
    | sed 's/^[[:space:]]*//'
}

dispatched=0
skipped=0

while IFS= read -r post_file; do
  [[ -z "$post_file" ]] && continue
  [[ ! -f "$post_file" ]] && { echo "WARN: file not found: $post_file" >&2; continue; }

  title=$(parse_frontmatter "$post_file" "title")
  published=$(parse_frontmatter "$post_file" "published")
  notify=$(parse_frontmatter "$post_file" "notify")
  post_date=$(parse_frontmatter "$post_file" "date" | awk '{print $1}')
  excerpt=$(parse_frontmatter "$post_file" "excerpt")
  permalink=$(parse_frontmatter "$post_file" "permalink")
  image=$(parse_frontmatter "$post_file" "image")

  # Skip if explicitly opted out
  if [[ "$notify" == "false" ]]; then
    echo "SKIP (notify:false): $post_file" >&2
    ((skipped++)); continue
  fi

  # Skip unpublished
  if [[ "$published" == "false" ]]; then
    echo "SKIP (published:false): $post_file" >&2
    ((skipped++)); continue
  fi

  # Skip future-dated posts
  if [[ -n "$post_date" && "$post_date" > "$TODAY" ]]; then
    echo "SKIP (future date $post_date): $post_file" >&2
    ((skipped++)); continue
  fi

  # Resolve URL: use permalink if set, otherwise derive from filename
  # Filename pattern: YYYY-MM-DD-slug.md
  if [[ -n "$permalink" ]]; then
    post_url="${SITE_URL}${permalink}"
  else
    slug=$(basename "$post_file" .md | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//')
    post_url="${SITE_URL}/${slug}/"
  fi

  # Build notification body from excerpt or post body
  if [[ -z "$excerpt" ]]; then
    body_text=$(awk '/^---/{f=!f; next} !f{print}' "$post_file" \
      | strip_markdown \
      | cut -c1-140)
  else
    body_text="$excerpt"
  fi

  # Derive stable external_id from permalink/slug to prevent duplicate sends
  external_id=$(echo "$post_url" | md5sum | awk '{print $1}')

  echo "DISPATCH: $title -> $post_url" >&2

  # Build JSON payload
  payload=$(cat <<JSON
{
  "app_id": "${ONESIGNAL_APP_ID}",
  "included_segments": ["All"],
  "headings": {"en": "${title}"},
  "contents": {"en": "${body_text}"},
  "url": "${post_url}",
  "external_id": "${external_id}"
  $([ -n "$image" ] && echo ', "big_picture": "'"${SITE_URL}${image}"'", "chrome_web_image": "'"${SITE_URL}${image}"'"' || true)
}
JSON
)

  response=$(curl --silent --show-error --fail-with-body \
    --request POST \
    --url "https://api.onesignal.com/notifications" \
    --header "Content-Type: application/json" \
    --header "Authorization: Basic ${ONESIGNAL_REST_API_KEY}" \
    --data "$payload" 2>&1) || {
    # Redact secret from any error output before printing
    echo "ERROR dispatching notification for: $post_file" >&2
    echo "$response" | sed "s/${ONESIGNAL_REST_API_KEY}/***REDACTED***/g" >&2
    exit 1
  }

  echo "OK: $(echo "$response" | grep -o '"id":"[^"]*"' | head -1)" >&2
  ((dispatched++))

done

echo "Done. dispatched=${dispatched} skipped=${skipped}" >&2
