json.extract!(list, :id, :title, :ord)

json.cards do
  json.array!(list.cards, :id, :title, :ord)
end