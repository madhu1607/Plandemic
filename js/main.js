$(document).ready(function() {
  $("#add-form-task").on("submit", function(e) {
    addTask(e);
  });

  $("#edit-form-task").on("submit", function(e) {
    updateTask(e);
  });

  $("#task-table").on("click", "#remove-task", function() {
    id = $(this).data("id");
    removeTask(id);
  });

  $("#clear-tasks").on("click", function() {
    clearAllTasks();
  });

  var currentDate = new Date();
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var yyyy = currentDate.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  currentDate = yyyy + "-" + mm + "-" + dd;
  if (document.getElementById("date")) {
    document.getElementById("date").setAttribute("min", currentDate);
  }
  displayTask();

  function displayTask() {
    var taskList = JSON.parse(localStorage.getItem("tasks"));
    if (taskList != null && taskList.length > 0) {
      taskList = taskList.sort(sortByTime);
      document.getElementById("task-table").classList.remove("hidden");
      document.getElementById("clear-tasks").classList.remove("hidden");
    } else {
      document.getElementById("task-table").classList.add("hidden");
      document.getElementById("clear-tasks").classList.add("hidden");
      $("#left-container").append(
        '<span class="not-found-message">There is no task added to the list</span>'
      );
    }

    var i = 0;

    if (localStorage.getItem("tasks") != null && taskList.length > 0) {
      $.each(taskList, function(key, value) {
        $("#task-table").append(
          '<tr id="' +
            value.id +
            '">' +
            "<td>" +
            value.task +
            "</td>" +
            "<td>" +
            value.task_priority +
            "</td>" +
            "<td>" +
            value.task_date +
            "</td>" +
            "<td>" +
            value.task_time +
            "</td>" +
            '<td><a href="edit.html?id=' +
            value.id +
            '">Edit</a> | <a href="#" id="remove-task" data-id="' +
            value.id +
            '">Remove</a></td>' +
            "</tr>"
        );
      });
    }

    function sortByTime(a, b) {
      var aTime = a.task_time;
      var bTime = b.task_time;
      return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
    }
  }

  function addTask(e) {
    //Unique ID
    var newDate = new Date();
    id = newDate.getTime();
    var task = $("#task").val();
    var task_priority = $("#priority").val();
    var task_date = $("#date").val();
    var task_time = $("#time").val();

    if (task == "") {
      alert("Task is Required");
      e.preventDefault();
    } else if (task_date == "") {
      alert("Date is Required");
      e.preventDefault();
    } else if (task_time == "") {
      alert("Time is Required");
      preventDefault();
    } else if (task_priority == "") {
      task_priority = "normal";
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));

      if (tasks == null) {
        tasks = [];
      }
      var taskList = JSON.parse(localStorage.getItem("tasks"));

      var new_task = {
        id: id,
        task: task,
        task_priority: task_priority,
        task_date: task_date,
        task_time: task_time
      };

      tasks.push(new_task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function updateTask(e) {
    var id = $("#task_id").val();
    var task = $("#task").val();
    var task_priority = $("#priority").val();
    var task_date = $("#date").val();
    var task_time = $("#time").val();
    taskList = JSON.parse(localStorage.getItem("tasks"));

    for (var i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        taskList.splice(i, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    if (task == "") {
      alert("Task is Required");
      e.preventDefault();
    } else if (task_date == "") {
      alert("Date is Required");
      e.preventDefault();
    } else if (task_time == "") {
      alert("Time is Required");
      preventDefault();
    } else if (task_priority == "") {
      task_priority = "normal";
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));

      if (tasks == null) {
        tasks = [];
      }
      var taskList = JSON.parse(localStorage.getItem("tasks"));

      var new_task = {
        id: id,
        task: task,
        task_priority: task_priority,
        task_date: task_date,
        task_time: task_time
      };

      tasks.push(new_task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function removeTask(id) {
    if (confirm("Are you sure you want to delete the task?")) {
      var taskList = JSON.parse(localStorage.getItem("tasks"));

      for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
          taskList.splice(i, 1);
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
      }
      location.reload();
      displayTask();
    }
  }

  function clearAllTasks() {
    if (confirm("Do you want to clear all tasks?")) {
      localStorage.clear();
      location.reload();
    }
  }
});
function getTask() {
  var $_GET = getQueryParams(document.location.search);
  id = $_GET["id"];

  var taskList = JSON.parse(localStorage.getItem("tasks"));

  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      $("#edit-form-task #task_id").val(taskList[i].id);
      $("#edit-form-task #task").val(taskList[i].task);
      $("#edit-form-task #priority").val(taskList[i].task_priority);
      $("#edit-form-task #date").val(taskList[i].task_date);
      $("#edit-form-task #time").val(taskList[i].task_time);
    }
  }
}

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}
function updateTime() {
  var now = new Date();
  var min = now.getMinutes();
  var hour = now.getHours() % 12 + min / 60;
  var minangle = min * 6;
  var hourangle = hour * 30;
  var seconds = now.getSeconds();
  var secangle = seconds * 6;
  var minhand = document.getElementById("minutehand");
  var hourhand = document.getElementById("hourhand");
  var sechand = document.getElementById("secondhand");
  function refresh() {
    setTimeout(function() {
      load();
    }, 1000);
  }
  function load() {
    updateTime();
    minhand.setAttribute("transform", "rotate(" + minangle + ",50,50)");
    hourhand.setAttribute("transform", "rotate(" + hourangle + ",50,50)");
    sechand.setAttribute("transform", "rotate(" + secangle + ",50,50)");
  }
  refresh();
  CurDate();
}

function CurDate() {
  var cdate = new Date();
  var ds = cdate.toDateString();
  document.getElementById("curdate").innerHTML = ds;
}
