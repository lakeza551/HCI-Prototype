const addInput = element => {
    const parent = element.parentNode
    const newNode = document.createElement('input')
    newNode.type = 'text'
    parent.insertBefore(newNode, element)
}