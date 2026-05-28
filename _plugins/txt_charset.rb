Jekyll::Hooks.register :site, :post_write do |site|
  site.pages.each do |page|
    next unless page.url.end_with?('.txt')
    dest = page.destination(site.dest)
    next unless File.exist?(dest)
    content = File.binread(dest)
    bom = "\xEF\xBB\xBF".b
    unless content.byteslice(0, 3) == bom
      File.binwrite(dest, bom + content)
    end
  end
end
