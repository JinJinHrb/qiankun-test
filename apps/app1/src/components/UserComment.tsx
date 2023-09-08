import { useCallback, useEffect, useRef, KeyboardEvent } from 'react'
import './UserComment.css'

export default function UserComment() {
	const editorRef = useRef<HTMLDivElement>(null)

	const onInput = (e: any) => {
		console.log(e)
	}

	const insert = () => {
		let sel = window.getSelection()
		if (!sel) return
		let range = sel?.rangeCount > 0 ? sel?.getRangeAt(0) : null
		console.log(sel, range)
		if (!range) return

		const contentNode = document.createElement('span')
		contentNode.contentEditable = 'false'
		contentNode.classList.add('tag')
		contentNode.innerText = 'Hello'

		if (range.commonAncestorContainer.parentElement?.nodeName === 'SPAN') {
			console.log('parent')
			range.setStartAfter(range.commonAncestorContainer.parentElement)
		}
		range.insertNode(contentNode)

		let contentRange = range.cloneRange()
		contentRange.setStartAfter(contentNode) // 设置光标位置为插入内容的末尾
		contentRange.collapse(true) // 移动光标至末尾
		sel.removeAllRanges() //移出所有选区
		sel.addRange(contentRange) //添加修改后的选区

		editorRef.current?.focus()
	}

	// const selectHandler = useCallback(() => {
	//   let sel = window.getSelection()
	//   if (!sel) return
	//   let range = sel?.rangeCount > 0 ? sel?.getRangeAt(0) : null

	//   if (range && range.commonAncestorContainer.ownerDocument?.activeElement?.id === this)
	// }, [])

	useEffect(() => {
		// document.addEventListener('selectionchange', selectHandler)
		// return () => {
		//   document.removeEventListener('selectionchange', selectHandler)
		// }
	}, [])

	function getLastTextNodeIn(node: ChildNode | null) {
		while (node) {
			if (node.nodeType == 3) {
				return node
			} else {
				node = node.lastChild
			}
		}
	}

	function isRangeAfterNode(range: Range, node: ChildNode | null) {
		var nodeRange, lastTextNode
		if (range.compareBoundaryPoints) {
			nodeRange = document.createRange()
			lastTextNode = getLastTextNodeIn(node)
			nodeRange.selectNodeContents(lastTextNode as any)
			nodeRange.collapse(false)
			return range.compareBoundaryPoints(range.START_TO_END, nodeRange) > -1
		}
	}

	function onKeyDown(evt: KeyboardEvent) {
		var range, node, nodeToDelete
		if (evt.keyCode == 8) {
			// Get the DOM node containing the start of the selection
			let sel = window.getSelection()
			if (!sel) return
			range = sel.getRangeAt(0)
			if (!range) return

			//@ts-ignore
			node = editorRef.current.lastChild
			while (node) {
				if (isRangeAfterNode(range, node)) {
					nodeToDelete = node
					break
				} else {
					node = node.previousSibling
				}
			}

			if (nodeToDelete) {
				//@ts-ignore
				editorRef.current.removeChild(nodeToDelete)
			}
			return false
		}
	}

	return (
		<div>
			<div>
				<button onClick={insert}>插入</button>
			</div>
			<div className='comment-editor' ref={editorRef} contentEditable onInput={onInput} onKeyDown={onKeyDown}></div>
		</div>
	)
}
