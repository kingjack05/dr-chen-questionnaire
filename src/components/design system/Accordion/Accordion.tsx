export const Accordion = ({ title, children }) => {
    return (
        <details className="group" open>
            <summary className="flex cursor-pointer list-none items-center justify-between">
                <span>{title}</span>
                <span className="transition group-open:rotate-180">
                    <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        shapeRendering="geometricPrecision"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </span>
            </summary>
            <p className="group-open:animate-fadeIn">{children}</p>
        </details>
    )
}
