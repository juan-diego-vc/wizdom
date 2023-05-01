import './ComponentsList.css'

export default function ComponentsList(){

    const items = [
        { type : 'Text', description : 'Just start writing with plain text' },
        { type : 'Title', description : 'Add a heading component' },
        { type : 'Image', description : 'Upload or embed with a link' },
        { type : 'Text', description : 'Just start writing with plain text' },
        { type : 'Title', description : 'Add a heading component' },
        { type : 'Image', description : 'Upload or embed with a link' },
    ]

    return <div className="components-list">{
        items.map( (item, k) => 
            <div className="component" key={k}>
                <div className="preview">[]</div>
                <div className="component-description">
                    <h3>{ item.type }</h3>
                    <p>{ item.description }</p>
                </div>
            </div>
        )
    }</div>
}