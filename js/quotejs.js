const quotes = [
    {
        quote: "Only I can change my life, no one can do it for me",
        interpretation: "내 인생을 바꾸는 사람은 자신입니다. 아무도 대신해줄 수 없어요.",
    },
    {
        quote: "I don't want to go school...",
        interpretation: "학교 가기 싫다",
    },
    {
        quote: "When does school end?",
        interpretation: "학교 언제 끝나",
    },
    {
        quote: "It is 8:50 when I wake up in the morning.",
        interpretation: "아침에 일어나보니 8시 50분이다.",
    },
    {
        quote: "There's a test tomorrow.",
        interpretation: "내일이 시험이다...",
    },
    {
        quote: "I don’t want to study.",
        interpretation: "공부하기 싫다.",
    },
    {
        quote: "I... have to do my homework...",
        interpretation: "숙제... 해야지..ㅠ",
    },
    {
        quote: "I don't want a perfect life, I want a happy life.",
        interpretation: "완벽한 인생을 원하지 않고 행복한 삶을 원합니다.",
    },
    {
        quote: "No sweat, No sweet.",
        interpretation: "땀 없인 달콤함도 없다.",
    },
];

const quote = document.querySelector("#quote span:first-child");
const interpretation = document.querySelector("#quote span:last-child");

todaysQuotes = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuotes.quote;
interpretation.innerText = todaysQuotes.interpretation;