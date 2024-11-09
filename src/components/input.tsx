export default function Input() {
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }}>
            <input type="text" placeholder=""/>
            <button type="submit">Submit</button>
        </form>
    )
}
