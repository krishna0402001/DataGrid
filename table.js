let obj = [
  {
    Id: 1,
    Name: "Joseph",
    CreatedAt: "19 August 2023",
    UpdatedAt: "20 August 2023",
    Quantity: "9",
  },
  {
    Id: 2,
    Name: "Ronnie",
    CreatedAt: "21 August 2023",
    UpdatedAt: "22 August 2023",
    Quantity: "4",
  },
  {
    Id: 3,
    Name: "Xavier",
    CreatedAt: "23 August 2023",
    UpdatedAt: "24 August 2023",
    Quantity: "10",
  },
  {
    Id: 4,
    Name: "Alex",
    CreatedAt: "25 August 2023",
    UpdatedAt: "26 August 2023",
    Quantity: "2",
  },
  {
    Id: 5,
    Name: "Dustin",
    CreatedAt: "27 August 2023",
    UpdatedAt: "28 August 2023",
    Quantity: "11",
  },
  {
    Id: 6,
    Name: "John",
    CreatedAt: "29 August 2023",
    UpdatedAt: "30 August 2023",
    Quantity: "3",
  },
];

const columns = [
  { fieldName: "Id" },
  { fieldName: "Name" },
  { fieldName: "CreatedAt" },
  { fieldName: "UpdatedAt" },
  { fieldName: "Quantity" },
  { fieldName: "Status" },
];

let div = document.getElementById("demo");
let table = document.createElement("table");
table.setAttribute("id", "table");
let checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");
// checkbox.setAttribute("id", "checker");
table.classList.add("table");
let tbody = document.createElement("tbody");
tbody.classList.add("tbody");

//function of work

function addData(data) {
  let arr = data;
  //   getting header data;
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr-header");
  tr.classList.add("header");
  let i = 0;
  for (let x of columns) {
    let th = document.createElement("th");
    let btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.classList.add("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", `btn${i}`);
    th.textContent = x.fieldName;
    th.appendChild(btn);
    tr.appendChild(th);
    tbody.appendChild(tr);
    i++;
  }
  tr.prepend(checkbox);
  //getting td data
  for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", `tr${i}`);
    tr.classList.add("tr");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `checker${i}`);
    tr.appendChild(checkbox);
    //insert values in tds
    let value = Object.values(arr[i]);
    for (let j = 0; j < value.length; j++) {
      let td = document.createElement("td");
      td.setAttribute("id", `td${j}`);
      td.classList.add("td");
      td.textContent = value[j];
      td.setAttribute("contenteditable", "true");
      tr.appendChild(td);
    }
    checkbox.addEventListener("click", () => {
      let get = document.getElementById(`tr${i}`);
      get.checked = checkbox.checked;
      if (get.checked) {
        let b = get.innerText.split("\t");
        let c = Object.assign({}, b);
        console.log(c);
        get.style.backgroundColor = "rgb(105, 105, 105)";
      } else {
        get.style.backgroundColor = "rgb(39, 40, 41)";
      }
    });
    //status for backend
    let status = document.createElement("select");
    status.setAttribute("id", "status");
    status.classList.add("status");
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    option1.setAttribute("id", "opt1");
    option2.setAttribute("id", "opt2");
    option1.classList.add("opt1");
    option2.classList.add("opt2");
    option1.textContent = "Active";
    option2.textContent = "Inactive";
    status.appendChild(option1);
    status.appendChild(option2);
    tr.appendChild(status);
    tbody.appendChild(tr);
  }
  checkbox.addEventListener("click", () => {
    for (let i = 0; i < arr.length; i++) {
      let get = document.getElementById(`checker${i}`);
      get.checked = checkbox.checked;
      if (get.checked) {
        let a = document.getElementById(`tr${i}`);
        let b = {};
        b = a.innerText.split("\t");
        console.log(b);
        a.style.backgroundColor = "rgb(105, 105, 105)";
      } else {
        let a = document.getElementById(`tr${i}`);
        a.style.backgroundColor = "rgb(39, 40, 41)";
      }
    }
  });
  //add pagination
  const nav = document.createElement("nav");
  nav.setAttribute("id", "pagination-Container");
  nav.classList.add("clsPagination");
  const prevButton = document.createElement("button");
  const NextButton = document.createElement("button");
  prevButton.classList.add("prevBtn");
  NextButton.classList.add("nextBtn");
  prevButton.setAttribute("id", "prev-Btn");
  NextButton.setAttribute("id", "next-Btn");
  const navDiv = document.createElement("div");
  navDiv.classList.add("navDiv");
  navDiv.setAttribute("id", "nav-div");
  nav.appendChild(prevButton)
  nav.appendChild(navDiv)
  nav.appendChild(NextButton)
  table.appendChild(tbody);
  div.appendChild(table);
  
  //reverse Function
  // for first arrow button
  let button = document.getElementById("btn0");
  button.addEventListener("click", () => {
    button.innerHTML = "↓";
    let get = document.getElementById("table");
    //loop on how much data is in array
    for (let i = arr.length; i >= 1; i--) {
      get.rows[arr.length].parentNode.insertBefore(
        table.rows[i],
        table.rows[arr.length + 1]
      );
    }
  });

  //for second arrow button
  let button1 = document.getElementById("btn1");
  button1.addEventListener("click", () => {
    button1.innerHTML = "↓";
    let table = document.getElementById("table");
    let sort = false;
    while (sort == false) {
      sort = true;
      let row = table.rows;
      for (let i = 1; i < row.length - 1; i++) {
        let x = row[i].getElementsByTagName("td")[1];
        let y = row[i + 1].getElementsByTagName("td")[1];
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          row[i].parentNode.insertBefore(row[i + 1], row[i]);
          sort = false;
        }
      }
    }
  });
  //for third Arrow Button
  let button2 = document.getElementById("btn2");
  button2.addEventListener("click", () => {
    let sort = false;
    let table = document.getElementById("table");
    while (sort == false) {
      sort = true;
      let row = table.rows;
      for (let i = 1; i < row.length - 1; i++) {
        let a = new Date(
          row[i].getElementsByTagName("td")[2].innerText
        ).getTime();
        let b = new Date(
          row[i + 1].getElementsByTagName("td")[2].innerText
        ).getTime();
        if (a < b) {
          button2.innerHTML = "↓";
          row[i].parentNode.insertBefore(row[i + 1], row[i]);
          sort = false;
        }
      }
    }
  });
  //for forth button
  let button3 = document.getElementById("btn3");
  button3.addEventListener("click", () => {
    let sort = false;
    let table = document.getElementById("table");
    while (sort == false) {
      sort = true;
      let row = table.rows;
      for (let i = 1; i < row.length - 1; i++) {
        let a = new Date(
          row[i].getElementsByTagName("td")[3].innerText
        ).getTime();
        let b = new Date(
          row[i + 1].getElementsByTagName("td")[3].innerText
        ).getTime();
        if (a < b) {
          button3.innerHTML = "↓";
          row[i].parentNode.insertBefore(row[i + 1], row[i]);
          sort = false;
        }
      }
    }
  });
  //for button 5
  let button4 = document.getElementById("btn4");
  button4.addEventListener("click", () => {
    let sort = false;
    let table = document.getElementById("table");
    while (sort == false) {
      sort = true;
      let row = table.rows;
      for (let i = 1; i < row.length - 1; i++) {
        let a = Number(row[i].getElementsByTagName("td")[4].innerText);
        let b = Number(row[i + 1].getElementsByTagName("td")[4].innerText);
        if (a < b) {
          button4.innerHTML = "↓";
          row[i].parentNode.insertBefore(row[i + 1], row[i]);
          sort = false;
        }
      }
    }
  });
}
addData(obj);
