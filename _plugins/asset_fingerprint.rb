require 'digest/md5'
require 'fileutils'

module Jekyll
  class AssetFingerprint < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @asset_path = markup.strip
    end

    def render(context)
      site = context.registers[:site]
      source = find_source(site)

      unless source
        Jekyll.logger.warn "AssetFingerprint:", "File not found: #{@asset_path}"
        return @asset_path
      end

      content = File.read(source)
      digest = Digest::MD5.hexdigest(content)[0..7]
      ext = File.extname(@asset_path)
      base = File.basename(@asset_path, ext)
      dir = File.dirname(@asset_path)

      fingerprinted_path = "#{dir}/#{base}-#{digest}#{ext}"

      # Store for post_write hook
      site.data['asset_fingerprints'] ||= {}
      site.data['asset_fingerprints'][@asset_path] = {
        fingerprinted_path: fingerprinted_path,
        source: source
      }

      fingerprinted_path
    end

    private

    def find_source(site)
      path = File.join(site.source, @asset_path)
      return path if File.exist?(path)

      # Try .scss if .css not found
      if @asset_path.end_with?('.css')
        scss_path = File.join(site.source, @asset_path.sub(/\.css$/, '.scss'))
        return scss_path if File.exist?(scss_path)
      end

      nil
    end
  end
end

# Hook to copy fingerprinted files after site is written
Jekyll::Hooks.register :site, :post_write do |site|
  site.data['asset_fingerprints']&.each do |original_path, data|
    dest = File.join(site.dest, data[:fingerprinted_path])
    source_in_dest = File.join(site.dest, original_path)

    FileUtils.mkdir_p(File.dirname(dest))

    if File.exist?(source_in_dest)
      FileUtils.cp(source_in_dest, dest)
    elsif File.exist?(data[:source])
      FileUtils.cp(data[:source], dest)
    end
  end
end

Liquid::Template.register_tag('asset', Jekyll::AssetFingerprint)
