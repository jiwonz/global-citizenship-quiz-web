import { NextResponse } from "next/server";

const maxQuestionCount = 10;
const questions = [
	{
		q: "분리배출과 관련하여 다음 중 일반 쓰레기가 아닌것은 무엇일까요?",
		choice: [
			"칫솔",
			"건전지",
			"솜이불",
			"달걀껍질",
			"인형"
		],
		a: 1
	},
	{
		q: "다음 중 친환경적인 교통수단은 무엇인가요?",
		choice: [
			"승용차",
			"트럭",
			"오토바이",
			"자전거"
		],
		a: 3
	},
	{
		q: "다음 중 제조과정에서 가장 많은 물을 필요로 하는 것은 무엇일까요?",
		choice: [
			"철 1톤",
			"신문지 1톤",
			"휘발유 1톤",
			"승용차 1대"
		],
		a: 3
	},
	{
		q: "다음의 분리 배출 중 잘못된 방법은 무엇일까요?",
		choice: [
			"달걀을 먹고 껍데기를 일반쓰레기에 버렸어요.",
			"콜라를 마시고 라벨을 떼어서 버렸어요.",
			"종류별로 구분해서 분리수거함에 버렸어요.",
			"용기안에 이물질이 묻었지만 내용물은 다먹어서 그대로 버렸어요."
		],
		a: 3
	},
	{
		q: "1997년, 온실가스 배출을 줄이자는 목표를 위해 OO의정서가 개최되었습니다. OO에 들어갈 말은 무엇일까요?",
		choice: [
			"로마",
			"파리",
			"교토",
			"베를린"
		],
		a: 2
	},
	{
		q: "환경오염행위를 신고할 수 있는 환경부의 환경신문고 전화번호는 무엇일까요?",
		choice: [
			"120",
			"128",
			"132",
			"134"
		],
		a: 1
	},
	{
		q: "대기 중의 오존의 농도가 높아지면 사람과 동식물에 피해를 줍니다. 대기 중의 오존 농도를 측정하기 위해 가장 흔히 사용되는 식물은 무엇일까요?",
		choice: [
			"살구나무",
			"은행나무",
			"들깨",
			"단풍나무"
		],
		a: 2
	},
	{
		q: "일상 속에서 미세먼지를 줄일 수 있는 방법으로 옳지 않은 것은 무엇일까요?",
		choice: [
			"가까운 거리는 걸어 다닙니다.",
			"쓰레기 배출을 줄입니다.",
			"적정 실내온도를 유지합니다.",
			"미세먼지가 나쁜 날에는 환기하지 않습니다."
		],
		a: 3
	},
	{
		q: "환경 파괴와 자원 낭비의 문제를 되새기고, 지구 사랑을 실천하자는 뜻에서 만들어진 지구의 날은 언제일까요?",
		choice: [
			"3월 22일",
			"4월 22일",
			"6월 8일",
			"10월 4일"
		],
		a: 1
	},
	{
		q: "친환경 건축 기법인 이것은 건물 옥상에 식물을 심어 정원을 조성하는 방법을 뜻합니다. 이것은 무엇일까요?",
		choice: [
			"파란지붕",
			"녹색지붕",
			"노란지붕",
			"하얀지붕"
		],
		a: 1
	},
	{
		q: "오존층 파괴로 인해 발생되는 문제는 무엇입니까?",
		choice: [
			"피부암 발생률이 높아집니다.",
			"자외선 투과량이 증가합니다.",
			"가시광선 투과량이 증가합니다.",
			"방사능 투과량이 증가합니다."
		],
		a: 1
	},
	{
		q: "대기 오염 물질로 독성을 가지고 있어 피부 질환 및 면역 체계에 이상을 일으키고 발암 및 기형을 유발하는 것으로 알려져 있는 이 물질은 무엇일까요?",
		choice: [
			"황",
			"일산화탄소",
			"다이옥신",
			"수은"
		],
		a: 2
	},
	{
		q: "환경을 실천하고 있지 않은 친구는 누구일까요?",
		choice: [
			"샤오칸: 저희 집은 1층이지만, 엘리베이터가 편해서 엘리베이터를 매일 타요.",
			"스콜피온: 저는 엄마 심부름으로 마트를 갈 때, 장바구니를 챙겨가요.",
			"레이든: 학습지를 풀고 나서 뒷면이 깨끗하길래 오답노트 종이로 사용했어요."
		],
		a: 0
	}
];

function shuffleChoice(array, answerIndex) {
	let currentIndex = array.length;
	const answer = array[answerIndex];

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

	  // Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		
	  // And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array.indexOf(answer);
}

export const dynamic = 'force-dynamic'

export async function GET() {
	const quizItems = [...questions];
	const quiz = [];
	for (let i = 0; i < maxQuestionCount; i++) {
		const randomItemIndex = Math.floor(Math.random() * quizItems.length);
		const chosenItem = quizItems[randomItemIndex]
		const newAnswer = shuffleChoice(chosenItem.choice, chosenItem.a);
		chosenItem.a = newAnswer
		quiz.push(chosenItem);
		console.log(chosenItem);
		quizItems.splice(randomItemIndex, 1);
	}
	return NextResponse.json(quiz, { status: 200 });
}
