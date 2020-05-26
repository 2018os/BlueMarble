import React from "react";

function StatusPlayer(props) {
    const { clientsList } = props;
    console.log(clientsList);

    const clientMap = clientsList.map((data, index) => {
        return (
            <div key={index} className={`player player_${index}`}>
                id: {data}
                {/* 돈:  */}
            </div>
        );
    });

    return <div className="StatusPlayer">{clientMap}</div>;
}

export default StatusPlayer;
