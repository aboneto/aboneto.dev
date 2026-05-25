module RawGenerator
  class Generator < Jekyll::Generator
    def generate(site)
      site.collections['posts'].docs.each do |post|
        slug = post.url.delete('/')
        site.pages << RawPage.new(site, site.source, site.layouts, post, slug)
      end
    end
  end
end

class RawPage < Jekyll::Page
  def initialize(site, base, layouts, post, slug)
    @site = site
    @base = base
    @layouts = layouts
    @post = post
    @slug = slug

    @name = "#{slug}.md"
    @path = post.path
    @url = "/raw/#{slug}.md"

    process(@name)
    read_yaml(@base, @name)

    @data['title'] = post.data['title']
    @data['date'] = post.data['date']
    @data['layout'] = 'raw-markdown'
    @data['permalink'] = "/raw/#{slug}.md"
  end

  def content
    raw = File.read(@post.path, encoding: 'utf-8')
    raw.sub(/\A---\n.*?\n---\n\n?/m, '').gsub(@site.config['url'], '')
  end

  def render_with_liquid?
    false
  end

  def destination(dest)
    File.join(dest, @url)
  end
end
