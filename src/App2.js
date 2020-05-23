import React, {useState, useEffect} from "react";
import axios from "axios";
/*
*   const [변수명, setter] = useState("[]") 이런 식. setter가 있어야 함
*   const [music, setMusic]
*
*   useEffect(() => {
*       처리 => 데이터 읽기(axios, fetch등을 이용)
*   });
*
*   componentDidMount일 때는 deps 주기, componentDidUpdate일 때는 deps 안 줘도 됨
*
* */
function App2() {
    // let music = [];
    const [music, setMusic] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/music.json').then((res) => {
           setMusic(res.data); // 이렇게 setter로 값을 받는다.
           console.log(res.data);
        });
    }, []); // deps를 안 주면 update용으로 매 렌더 시에 실행된다.
                  // 최초의 didMount시에만 한 번 하고 싶으면 deps를 이렇게 설정해 줘야 함

    const handleChange = (e) => {
        console.log(e.target.value);
    };

    // 다중 조건문: {(조건) && 나오게 할 것}
    // html 출력 시에는 if문 등을 사용할 수 없기 때문에 이렇게 씀
    const html = music.map((m) =>
        <tr>
            <td>{m.rank}</td>
            <td>
                {
                    m.state === "상승" &&
                        <span style={{"color" : "red"}}>▲{m.idcrement}</span>
                }
                {
                    m.state === "하강" &&
                    <span style={{"color" : "blue"}}>▼{m.idcrement}</span>
                }
                {
                    m.state === "유지" &&
                    <span style={{"color" : "gray"}}>-</span>
                }
            </td>
            <td><img src={m.poster} width={"35"} height={"35"} /></td>
            <td>{m.title}</td>
            <td>{m.singer}</td>
        </tr>
    );

    return (
        <div className={"row"}>
            <H />
            <div style={{"height" : "30px"}}></div>
            <table className={"table"}>
                <tr>
                    <td>
                        <input type={"text"} className={"input-sm"} size={"25"} onChange={handleChange}/>
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <thead>
                    <th>순위</th>
                    <th>등폭</th>
                    <th></th>
                    <th>곡명</th>
                    <th>가수</th>
                </thead>
                <tbody>
                    {html}
                </tbody>
            </table>
        </div>
    )
}

// 이렇게 해도 되고
/*function H() {
    return (
        <h1 className={"text-center"}>Music Top50</h1>
    )
}*/

// 이렇게 해도 된다
const H = () => {
    const color = ["red", "orange", "pink", "yellow", "blue"];
    const no = parseInt(Math.random() * 5);
    return (
        <h1 className={"text-center"} style={{"color" : color[no]}}>Music Top50</h1>
    )
}

// 이렇게 해도 되지
const H2 = function () {
    return (
        <h1 className={"text-center"}>Music Top50</h1>
    )
}

export default App2;