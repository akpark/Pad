json.total_count @search_results.total_count
json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == Note
      json.partial!('api/notes/note', note: result)
    elsif result.class == Notebook
      json.partial!('api/notebooks/notebook', notebook: result)
    end

    json._type result.class.to_s
  end
end
