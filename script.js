$(document).ready(function () {
    const words = [
        { word: "apple", translation: "яблуко" },
        { word: "house", translation: "будинок" },
        { word: "dog", translation: "собака" },
        { word: "book", translation: "книга" },
        { word: "car", translation: "автомобіль" },
        { word: "tree", translation: "дерево" },
        { word: "water", translation: "вода" },
        { word: "sun", translation: "сонце" },
        { word: "bread", translation: "хліб" },
        { word: "milk", translation: "молоко" }
    ];

    let shuffledWords = []; 
    let currentWordIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function initializeGame() {
        shuffledWords = shuffleArray([...words]); 
        currentWordIndex = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        $("#correctCount").text(correctAnswers);
        $("#incorrectCount").text(incorrectAnswers);
        updateWord();
    }

    function updateWord() {
        $("#randomWord").text(shuffledWords[currentWordIndex].word);
        $("#wordIndex").text(`Слово ${currentWordIndex + 1} із ${shuffledWords.length}`);
    }

    $("#checkButton").click(function () {
        const userTranslation = $("#translationInput").val().trim().toLowerCase();

        if (userTranslation === "") {
            alert("Будь ласка, введіть в поле переклад слова");
            return;
        }

        const correctTranslation = shuffledWords[currentWordIndex].translation;

        if (userTranslation === correctTranslation) {
            correctAnswers++;
            $("#correctCount").text(correctAnswers);
        } else {
            incorrectAnswers++;
            $("#incorrectCount").text(incorrectAnswers);
        }

        $("#translationInput").val(""); 
        currentWordIndex++;

        if (currentWordIndex < shuffledWords.length) {
            updateWord();
        } else {
            showResult();
        }
    });

    // Відображення результатів
    function showResult() {
        $("#finalResult").text(
            `Правильних відповідей: ${correctAnswers}\nНеправильних відповідей: ${incorrectAnswers}`
        );
        $("#resultModal").fadeIn();
    }

    // Перезапуск гри
    $("#restartButton").click(function () {
        $("#resultModal").fadeOut();
        initializeGame();
    });

    // Старт гри
    initializeGame();
});
