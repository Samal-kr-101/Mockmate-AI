export default function StatsCard({
    title,
    value
}) {

    return (

        <div
            style={{
                background: "#1f2937",
                color: "white",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                flex: 1,
                boxShadow:
                    "0 5px 20px rgba(0,0,0,.3)"
            }}
        >

            <h4>{title}</h4>

            <h2>{value}</h2>

        </div>

    );

}