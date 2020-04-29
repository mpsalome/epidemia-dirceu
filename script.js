var matrix = [];
var probSick = 0.7;
var probHeal = 0.2995;
var probDeath = 0.0695;
var arraySize = 15;
var numInfec = 1;
var divM = document.getElementById("matrix");
var spanCicles = document.getElementById("cicles");
var ciclos = 0;
document.body.onload = createArray();

document.getElementById("clear").addEventListener("click", clearScreen);
document.getElementById("run").addEventListener("click", drawArray);

function clearScreen() {
  divM.innerHTML = "";
  matrix = [];
  ciclos = 0;
  spanCicles.innerHTML = `${ciclos}`;
  numInfec = 1;
  createArray();
}

function probability(n) {
  return !!n && Math.random() <= n;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createArray() {
  for (let i = 0; i < arraySize; i++) {
    matrix.push([]);
    for (let j = 0; j < arraySize; j++) {
      let el = 0;
      if (document.getElementById("limitMove").checked) {
        if (probability(0.3)) {
          if (numInfec > 0) {
            if (probability(0.89)) {
              el = 1;
              numInfec--;
            }
          }
        } else {
          el = 2;
        }
      } else {
        if (probability(0.7)) {
          if (numInfec > 0) {
            if (probability(0.5)) {
              el = 1;
              numInfec--;
            }
          }
        } else {
          el = 2;
        }
      }
      matrix[i].push(el);
    }
  }
}

function drawArray() {
  document.getElementById("limitMove").disabled = true;
  document.getElementById("timeEnvolved").disabled = true;
  document.getElementById("clear").disabled = true;
  document.getElementById("run").disabled = true;
  if (!matrix.some((el) => el.some((el) => el === 1))) {
    console.log(matrix);
    divM.innerHTML = "";
    for (let i = 0; i < arraySize; i++) {
      for (let j = 0; j < arraySize; j++) {
        if (matrix[i][j] === 1) {
          divM.innerHTML += `<div class="element">🤢</div>`;
        } else if (matrix[i][j] === 2) {
          divM.innerHTML += `<div class="element">🏠</div>`;
        } else if (matrix[i][j] === 3) {
          divM.innerHTML += `<div class="element">💀</div>`;
        } else if (matrix[i][j] === 4) {
          divM.innerHTML += `<div class="element">😇</div>`;
        } else {
          divM.innerHTML += `<div class="element">👤</div>`;
        }
      }
      divM.innerHTML += `<br/>`;
    }
    alert("Não há ninguém doente!🎉🥳");
    document.getElementById("limitMove").disabled = false;
    document.getElementById("clear").disabled = false;
    document.getElementById("run").disabled = false;
    document.getElementById("timeEnvolved").disabled = false;
  } else {
    divM.innerHTML = "";
    for (let i = 0; i < arraySize; i++) {
      for (let j = 0; j < arraySize; j++) {
        if (matrix[i][j] === 1) {
          divM.innerHTML += `<div class="element">🤢</div>`;
        } else if (matrix[i][j] === 2) {
          divM.innerHTML += `<div class="element">🏠</div>`;
        } else if (matrix[i][j] === 3) {
          divM.innerHTML += `<div class="element">💀</div>`;
        } else if (matrix[i][j] === 4) {
          divM.innerHTML += `<div class="element">😇</div>`;
        } else {
          divM.innerHTML += `<div class="element">👤</div>`;
        }
      }
      divM.innerHTML += `<br/>`;
    }
    if (document.getElementById("timeEnvolved").checked) {
      setTimeout(() => {
        if (hasSickOrHealthy(matrix)) {
          spanCicles.innerHTML = `${ciclos}`;
          ciclos++;
          if (hasHealthy(matrix)) {
            [1, 2, 3, 4].forEach(() => {
              matrix = infectPeople(matrix);
              ciclos++;
            });
          }
          matrix = healPeople(matrix);
          matrix = killPeople(matrix);
          matrix = shuffle(matrix);
          drawArray();
        } else {
          alert(
            "Todo mundo que andava pelas ruas teve contato com o vírus❗🤡🦠"
          );
          document.getElementById("limitMove").disabled = false;
          document.getElementById("clear").disabled = false;
          document.getElementById("run").disabled = false;
          document.getElementById("timeEnvolved").disabled = false;
        }
      }, 2000);
    } else {
      setTimeout(() => {
        if (hasHealthy(matrix)) {
          spanCicles.innerHTML = `${ciclos}`;
          ciclos++;
          matrix = infectPeople(matrix);
          matrix = shuffle(matrix);
          drawArray();
        } else {
          alert("Todo mundo que andava pelas ruas ficou doente❗🤡🦠");
          document.getElementById("limitMove").disabled = false;
          document.getElementById("clear").disabled = false;
          document.getElementById("run").disabled = false;
          document.getElementById("timeEnvolved").disabled = false;
        }
      }, 2000);
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function hasHealthy(array) {
  return array.some((el) => el.some((el) => el === 0));
}

function hasSickOrHealthy(array) {
  if (
    array.some((el) => el.some((el) => el === 0)) ||
    array.some((el) => el.some((el) => el === 1))
  ) {
    return true;
  } else {
    return false;
  }
}

function infectPeople(array) {
  return array.map((item1, index1, array1) =>
    item1.map((item2, index2, array2) => {
      item2 = item2;
      try {
        if (item2 !== 2 || item2 !== 3 || item2 !== 4 ) {
          if (
            array2[index2 + 1] === 1 || //item à esquerda na matriz
            array2[index2 - 1] === 1 || //item à direita na matriz
            array1[index1 - 1][index2] === 1 || //item acima na matriz
            array1[index1 - 1][index2 + 1] === 1 || //item diagonal superior direita
            array1[index1 - 1][index2 - 1] === 1 || //item diagonal superior esquerda
            array1[index1 + 1][index2] === 1 || //item abaixo na matriz
            array1[index1 + 1][index2 + 1] === 1 || //item diagonal inferior direita
            array1[index1 + 1][index2 - 1] === 1 //item diagonal inferior direita
          ) {
            if (probability(probSick)) {
              item2 = 1;
            }
          }
        }
      } catch (error) {}
      return item2;
    })
  );
}

function healPeople(array) {
  return array.map((item) =>
    item.map((item) => {
      item = item;
      try {
        if (item !== 2) {
          if (item === 1) {
            if (probability(probHeal)) {
              item = 4;
            }
          }
        }
      } catch (error) {}
      return item;
    })
  );
}

function killPeople(array) {
  return array.map((item) =>
    item.map((item) => {
      item = item;
      try {
        if (item !== 2) {
          if (item === 1) {
            if (probability(probDeath)) {
              item = 3;
            }
          }
        }
      } catch (error) {}
      return item;
    })
  );
}
