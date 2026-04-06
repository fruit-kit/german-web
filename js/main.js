const checkAnswers = (formId) => {
    const form = document.getElementById(formId);
    const questions = form.querySelectorAll('.question');
    const selectedAnswers = form.querySelectorAll('input[type="radio"]:checked');
    const warningAlert = document.getElementById('warning-alert');
    const result = document.getElementById('result');

    if (selectedAnswers.length < questions.length) {
        warningAlert.classList.remove('d-none');
        result.classList.add('d-none');
        return;
    }

    warningAlert.classList.add('d-none');
    result.classList.remove('d-none');

    let rightAnswers = 0;

    questions.forEach((question) => {
        question.querySelectorAll('label').forEach((label) => {
            label.innerHTML = label.innerHTML.replace('✅', '').replace('❌', '');
        });

        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const selectedLabel = question.querySelector(`label[for="${selectedAnswer.id}"]`);
        const correctAnswer = question.querySelector('input[value="right"]');
        const correctLabel = question.querySelector(`label[for="${correctAnswer.id}"]`);

        if (selectedAnswer.value === 'right') {
            selectedLabel.innerHTML += ' ✅';
            rightAnswers++;
        } else {
            selectedLabel.innerHTML += ' ❌';
            correctLabel.innerHTML += ' ✅';
        }
    });

    const resultElement = document.getElementById('result');
    const rightAnswersInPercent = (rightAnswers / questions.length) * 100;
    resultElement.textContent = `Правильних відповідей: ${rightAnswersInPercent.toFixed(0)}%`;

    form.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.disabled = true;
    });
};