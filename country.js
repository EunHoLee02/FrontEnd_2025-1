async function searchCountry() {
    const countryName = document.getElementById('countryInput').value.trim();
    const resultArea = document.getElementById('resultArea');

    if (!countryName) {
        resultArea.innerHTML = '<p>나라명을 입력해주세요.</p>';
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();

        if (!data || data.status === 404) {
            resultArea.innerHTML = '<p>나라를 찾을 수 없습니다.</p>';
            return;
        }

        const country = data[0];
        const capital = country.capital ? country.capital[0] : '정보 없음';
        const flag = country.flags.png;

        resultArea.innerHTML = `
          <h2>${country.name.common}</h2>
          <p><strong>수도:</strong> ${capital}</p>
          <img src="${flag}" alt="국기">
        `;
    } catch (error) {
        console.error(error);
        resultArea.innerHTML = '<p>정보를 불러오는 데 실패했습니다.</p>';
    }
}