document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const filterButton = document.getElementById('good-dog-filter');
  
    function displayPup(pup) {
      const pupImage = document.createElement('img');
      pupImage.src = pup.image;
  
      const pupName = document.createElement('h2');
      pupName.textContent = pup.name;
  
      const pupButton = document.createElement('button');
      pupButton.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

      pupButton.addEventListener('click', () => {
        pup.isGoodDog = !pup.isGoodDog;
        pupButton.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
  

        fetch(`http://localhost:3000/pups/${pup.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isGoodDog: pup.isGoodDog })
        });
      });
  
      dogInfo.innerHTML = '';
      dogInfo.appendChild(pupImage);
      dogInfo.appendChild(pupName);
      dogInfo.appendChild(pupButton);
    }
  
    filterButton.addEventListener('click', () => {
      const filterStatus = filterButton.textContent.includes('OFF');
      filterButton.textContent = filterStatus ? 'Filter good dogs: ON' : 'Filter good dogs: OFF';
  
      fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(data => {
          const filteredPups = filterStatus ? data.filter(pup => pup.isGoodDog) : data;
          dogBar.innerHTML = '';
          filteredPups.forEach(pup => {
            const pupSpan = document.createElement('span');
            pupSpan.textContent = pup.name;
            pupSpan.addEventListener('click', () => displayPup(pup));
            dogBar.appendChild(pupSpan);
          });
        });
    });
  
    fetch('http://localhost:3000/pups')
      .then(response => response.json())
      .then(data => {
        data.forEach(pup => {
          const pupSpan = document.createElement('span');
          pupSpan.textContent = pup.name;
          pupSpan.addEventListener('click', () => displayPup(pup));
          dogBar.appendChild(pupSpan);
        });
      });
  });
  