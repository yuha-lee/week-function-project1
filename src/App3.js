import React, {Fragment, useState, useEffect, useCallback, useMemo} from "react";
import axios from "axios";

//container
function App3() {
    // 변수 설정
    const [music, setMusic] = useState([]);
    const [ss, setSs] = useState("");

    // 변수 초기값
    useEffect(() => {
        axios.get('http://localhost:3000/music.json').then((res) => {
           setMusic(res.data);
        });
    }, []);

    // 이벤트 등록
    const handleUserInput = useCallback((ss) => {
        setSs(ss);
    }, [ss]); // ss가 변경될 때만 호출하라는 뜻

    return (
        <div className={"row"}>
            <H2/>
            <SearchBar ss={ss} onUserInput={handleUserInput} />
            <div style={{"height" : "30px"}}></div>
            <MusicTable music={music} ss={ss} />
        </div>
    )
}

function MusicTable(props) {
    let row = [];
    props.music.forEach((m) => {
        if (m.title.indexOf(props.ss) == -1) {
            return;
        }
        row.push(<MusicRow music={m}/>);
    });

    return (
        <table className={"table"}>
            <thead>
                <tr className={"danger"}>
                    <th>순위</th>
                    <th></th>
                    <th>곡명</th>
                    <th>가수</th>
                </tr>
            </thead>
            <tbody>
                {row}
            </tbody>
        </table>
    )
}

function MusicRow(props) {
    return (
        <tr>
            <td>{props.music.rank}</td>
            <td><img src={props.music.poster} width={"30"} height={"30"}/></td>
            <td>{props.music.title}</td>
            <td>{props.music.singer}</td>
        </tr>
    )
}

function SearchBar(props) {
    // useCallback
    const onChange = (e) => {
        props.onUserInput(e.target.value);
    };

    return (
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"25"} className={"input-sm"}
                           placeholder={"Search"} onChange={onChange} value={props.ss}/>
                </td>
            </tr>
        </table>
    )
}

const H = () => {
    const color =["red", "blue", "green", "yellow", "pink"];
    const no = parseInt(Math.random() * 5);

    return (
        <h1 className={"text-center"} style={{"color": color[no]}}>Music Top50</h1>
    )
};

const H2 = React.memo(() => {
    // memo: 함수의 return을 기억. 한 번 호출하면 그 뒤에는 변하지 않고 유지
    // callback: 함수의 주소를 기억.
    const color =["red", "blue", "green", "yellow", "pink"];
    const no = parseInt(Math.random() * 5);

    return (
        <h1 className={"text-center"} style={{"color": color[no]}}>Music Top50</h1>
    )
});

export default App3;