export function getOnList(list, id: number){
	const res = list.find(item => item.value == id)
	return res.label
}