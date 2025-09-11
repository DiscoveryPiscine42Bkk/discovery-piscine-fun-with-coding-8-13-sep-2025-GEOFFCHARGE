function setCookie(cname, cvalue, exdays)
{
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie()
{
    let user = getCookie("todolist");
    if (user) {
        let tasks = JSON.parse(user);
        let allTodo = document.getElementById("ft_list");
        tasks.reverse().forEach(task => {
            let newTodo = document.createElement("div");
            newTodo.textContent = task;
            newTodo.onclick = deleteTodo;
            allTodo.appendChild(newTodo);
        });
    }
}

function updateCookie()
{
    let allTodo = [];
    let allDivs = document.querySelectorAll("#ft_list div");
    for (const div of allDivs)
    {
        allTodo.push(div.textContent);
    }
    setCookie("todolist", JSON.stringify(allTodo), 1);
}

function createTodo()
{
    let task = prompt("Enter a new to do!");
    if (task) {
        let allTodo = document.getElementById("ft_list");
        let newTodo = document.createElement("div");
        newTodo.textContent = task;
        newTodo.onclick = deleteTodo;
        allTodo.appendChild(newTodo);
        updateCookie();
    }
}

function deleteTodo(event)
{
    let deleteConfirmed = confirm("Delete this to do?");
    if (deleteConfirmed) {
        let allTodo = document.getElementById("ft_list");
        allTodo.removeChild(event.target);
        updateCookie();
    }
}
