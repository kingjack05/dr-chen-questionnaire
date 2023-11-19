export const CustomTooltip = (props) => {
    return (
        <div className=" w-40 border bg-white px-2 py-1">
            <p className="text-sm font-medium">{props.name}</p>
            <p className="whitespace-pre-wrap">{props.caption}</p>
        </div>
    )
}
