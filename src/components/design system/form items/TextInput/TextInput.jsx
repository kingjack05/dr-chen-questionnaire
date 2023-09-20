export const TextInput = (props) => {
    const { state, ...otherProps } = props
    return (
        <>
            <input {...otherProps} />
        </>
    )
}
