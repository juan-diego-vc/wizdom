import SidebarMenu from "../components/SidebarMenu";
import Group from "../test-components/Group";
import Text from "../test-components/Text";

import React, { useRef, useState, MouseEvent, CSSProperties } from 'react'

import { rand, randomId } from "../helpers/helpers";

interface Box{
    x : number
    y : number
    width : number
    height : number
}

enum types { text = 'text', group = 'group' }

abstract class NodeBase{

    id : string = randomId()
    shape : Box = {
        x : 0,
        y : 0,
        width : 400,
        height : 600         
    }
    abstract parent : Node | null
    abstract type : types
    abstract content : string | Array<Node>

    definePosition() : void {
        if(this.parent !== null){
            if(this.type === types.text){
                this.shape.width = 200
                this.shape.height = 30
            }else{
                this.shape.width = this.parent.shape.width / 2
                this.shape.height = this.parent.shape.height / 2
            }
            this.shape.x = rand(0, this.parent.shape.width - this.shape.width)
            this.shape.y = rand(0, this.parent.shape.height - this.shape.height)
        }
        console.log(this.type, this.shape)
    }

    toJSON() : Object {
        return {
            type : this.type,
            id: this.id,
            content: this.content,
            shape: this.shape
        }
    }
}

class TextNode extends NodeBase{

    type : types.text = types.text
    content: string = 'Hello world'
    parent: Node | null
    
    constructor(parent : Node | null){
        super()
        this.parent = parent
    }
}

class GroupNode extends NodeBase {

    type : types.group = types.group
    content: Array<Node> = []
    parent : Node | null

    constructor(parent : Node | null){
        super()
        this.parent = parent ? parent : null 
    }

    addElement(state : Node, type : types) : Node{
        return Tree.addChild(state, type, this.id)
    }
}

type Node = TextNode | GroupNode

const defaultTree = new GroupNode(null)
defaultTree.content = [ new TextNode(defaultTree), new TextNode(defaultTree) ]
defaultTree.content[0].definePosition()
defaultTree.content[1].definePosition()

console.log('defaultTree', defaultTree.shape)

class Tree{

    static selected : Node | null = null

    static copy(node: Node): Node {
        const nodeJSON = JSON.stringify(node);
        return Tree.parse(nodeJSON)
    }

    public static parse(content : string){
        let state = JSON.parse(content) as Node
        return Tree.fix(state, null)
    }

    private static fix(state : Node, parent : Node | null) : Node {
        let newNode : Node
        if(state.type === types.group){
            newNode = new GroupNode(parent)
            newNode.content = state.content.map(node => {
                return Tree.fix(node, newNode)
            })
        }else{
            newNode = new TextNode(parent)
            newNode.content = state.content
        }
        newNode.id = state.id
        newNode.shape = {...state.shape}
    
        return newNode
    }

    static stringify(node : Node ) : string {
        return JSON.stringify(node)
    }

    static addChild(node : Node, type : types, id? : string) : Node {
        // console.log(`Tree.addChild(${node.id}, ${type}, ${id})`)
        // console.log(`Tree.selected = ${Tree.selected?.id}, Tree.selected !== null ${Tree.selected !== null}`)

        if(id === undefined){
            if(Tree.selected !== null){
                id = Tree.selected.id
            }else{
                return node
            }
        }
        
        node = Tree.copy(node)
        // console.log('Tree.copy(node)')
        // console.log(node)
        let leaf = Tree.search(node, id)
        // console.log('leaf === Tree.search(node, id)',leaf === Tree.search(node, id))
        if(leaf === null || leaf.type !== types.group) return node

        let newNode : Node
        if(type === types.group){
            newNode = new GroupNode(leaf)
        }else{
            newNode = new TextNode(leaf)
        }
        newNode.definePosition()
        leaf.content.push(newNode)
        return node
    }

    static search(node : Node, id : string) : Node | null {
        if (node.id === id) return node;
    
        if (Array.isArray(node.content)) {
            for (const childNode of node.content) {
                const foundNode = Tree.search(childNode, id);
                if (foundNode) return foundNode;
            }
        }
    
        return null;
    }

    // static render(node : Node, select : (id : string ) => void ) : React.ReactNode{
    static render(node : Node) : React.ReactNode{

        const handleClick = (e : MouseEvent, id : string) : void => {
            e.stopPropagation()
            // select(node.id)
            Tree.selected = Tree.search(node, id)
            console.log(Tree.selected?.id)
        }

        const styles : CSSProperties = {
            position: node.parent === null ? 'relative' : 'absolute',
            backgroundColor : node.parent === null ? 'white' : '#ffffff55',
            width: node.shape.width,
            height : node.shape.height,
            left : node.shape.x,
            top : node.shape.y,
        }

        if(node.type === types.group && typeof node.content !== 'string'){
            return <Group
                shape={node.shape}
                key={node.id}
                style={styles}
                onClick={(e) => handleClick(e, node.id)} >{
                    node.content.map(
                        (element : Node) => Tree.render(element) )
                }</Group>
        }else if(typeof node.content === 'string'){
            return <Text
                style={styles}
                text={node.content}
                shape={node.shape}
                key={node.id}
                onClick={(e) => handleClick(e, node.id)}
                />
        }else{
            return <></>
        }
    }
}

export default function PostsPage(){
    const [tree, setTree] : [Node, Function] = useState(defaultTree)
    Tree.selected = Tree.selected ? Tree.selected : tree

    // const select = (id : string) => {
    //     selected.current = Tree.search(tree, id)
    //     console.log(selected.current)
    // }

    const addGroup = () => {
        if(Tree.selected && Tree.selected instanceof GroupNode){
            setTree((currentTree : Node) => {
                if(Tree.selected === null) return currentTree
                if(Tree.selected.type !== types.group) return currentTree
                let newTree = Tree.selected.addElement(currentTree, types.group)
                if(newTree === null){
                    return currentTree
                }else{
                    return newTree
                }
            })
        }
    }

    return <div className="page">
        <SidebarMenu/>
        <div className="page-content">
            {Tree.render(tree)}
            <button onClick={addGroup}>Add Group</button>
        </div>
    </div>   
}