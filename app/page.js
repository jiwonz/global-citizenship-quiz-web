"use client";

import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";

function Quiz(props) {
	const [selected, setSelected] = useState(null);
	const [invalid, setInvalid] = useState(false);
	const [correct, setCorrect] = useState(null);

	const options = [];
	for (const [i, v] of props.question.choice.entries()) {
		options.push({
			label: `${i + 1}. ${v}`,
			value: i
		});
	}

	useEffect(()=>{
		console.log("selected:",selected, props.question.a);
		if (selected == null) return;
		const isCorrect = selected == props.question.a;
		setInvalid(!isCorrect);
		if (correct == null) {
			setCorrect(isCorrect);
		}
	}, [selected]);

	let cardClassName
	if (correct == true) {
		cardClassName = "text-green-400"
	} else if (correct == false) {
		cardClassName = "line-through text-red-400"
	}
	return (
		<div className="p-1">
			<Card title={`[${props.i + 1}번 문제] ${props.question.q}`} className={cardClassName}>
				<ListBox invalid={invalid} value={selected} onChange={(e) => setSelected(e.value)} options={options} optionLabel="label" className="w-full md:w-14rem no-underline"/>
			</Card>
		</div>
	)
}

export default function Home() {
	const [quizData, setQuizData] = useState(null);
	const [loading, setLoading] = useState(true);

	const getQuiz = async () => {
		const res = await fetch("/api/quiz",  { next: { revalidate: 3600 } });
		const json = await res.json();
		console.log(json);
		setQuizData(json);
		setLoading(false);
	}
	useEffect(() => {
		getQuiz();
	}, []);

	const quizComponents = []
	if (quizData != null) {
		for (const [i, v] of Object.entries(quizData)) {
			const key = Number(i)
			quizComponents.push(<Quiz key={key} question={v} i={key} />);
		}
	}

	const items = []

	return (
		<div className="card">
			<div className="menubar card fixed z-2 w-full">
				<Menubar model={items} start={<span className="font-bold text-2xl p-5">세계 시민 퀴즈</span>} className="menubar p-3 surface-0 shadow-2"/>
			</div>
			<div className='p-5'></div>
			<div className="p-1 pt-5">
				<Message text="출처: 2023 에코프로 어린이 환경 골든벨 250제" />
			</div>
			{ loading && "로드 중" || null }
			{ quizComponents }
			<div className="p-1 flex space-x-4 mr-4">
				<Button label="채점하기" className="px-6" />
				<Button label="다시하기" onClick={getQuiz} className="px-6" />
			</div>
		</div>
	)
}
