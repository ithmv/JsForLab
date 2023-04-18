// Функция для сериализации массива целых чисел в диапазоне от 1 до 300 в строку
function serialize(arr) {
    // Создаем массив двоичных строк, представляющих числа в диапазоне от 1 до 300
    const binaryStrings = arr.map((n) => {
      // Преобразуем число в двоичную строку длиной 9 бит
      const binaryString = (n - 1).toString(2).padStart(9, "0");
      // Отбрасываем первый (наиболее значимый) бит
      return binaryString.slice(1);
    });
    // Создаем массив групп из трех чисел
    const groups = [];
    for (let i = 0; i < binaryStrings.length; i += 3) {
      const group = binaryStrings.slice(i, i + 3).map((s) => parseInt(s, 2));
      // Сохраняем два других числа в виде двух байт, удаляя первый бит из каждого
      group[1] |= (group[2] << 7) & 0xff;
      group[2] >>= 1;
      groups.push(group);
    }
    // Конвертируем массив групп в строку и возвращаем ее
    const result = groups
      .map((group) => String.fromCharCode(...group))
      .join("");
    return result;
  }
  
  // Функция для десериализации строки в массив целых чисел в диапазоне от 1 до 300
  function deserialize(str) {
    // Создаем массив групп из трех байт
    const groups = [];
    for (let i = 0; i < str.length; i += 3) {
      const group = str
        .slice(i, i + 3)
        .split("")
        .map((c) => c.charCodeAt(0));
      // Восстанавливаем два других числа из двоичного представления
      group[2] <<= 1;
      group[1] &= 0x7f;
      group[2] |= (group[1] & 0x80) >> 7;
      group[1] &= 0x7f;
      groups.push(group);
    }
    // Создаем массив чисел, преобразуя каждую группу в число в диапазоне от 1 до 300
    const result = groups.flatMap((group) => {
      const binaryStrings = group.map((n) =>
        n.toString(2).padStart(8, "0")
      );
      const binaryString = binaryStrings.join("");
      const n = parseInt("1" + binaryString, 2);
      return [n];
    });
    return result;
  }
  

const arr = [1, 5, 300, 100, 200];
const serialized = serialize(arr);
console.log("Serialized:", serialized);
console.log("Length before:", arr.length * 3);
console.log("Length after:", serialized.length);

const deserialized = deserialize(serialized);
console.log("Deserialized:", deserialized);
console.log("Equal?", JSON.stringify(arr) === JSON.stringify(deserialized));
