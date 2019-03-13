(function() {

  let form = document.forms.contactform;

  // handle form on submit
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });


  // gather all input elements
  let inputs = document.querySelectorAll("input");

  // add event listener on input elements
  for (let i = 0; i < inputs.length; ++i) {
    let inType = inputs[i].type;
    if (inType === "text" || inType === "email" || inType === "tel") {
      inputs[i].addEventListener("keyup", function(event) {
        if (event.key !== "Tab") {
          let ele = event.target;
          validateItem(ele, false);
        }
      });

      inputs[i].addEventListener("blur", function(event) {
        let ele = event.target;
        validateItem(ele, false);
      });

    } else if (inType === "checkbox" && inputs[i].name === "個人情報の取扱いに同意") {
      inputs.item(i).addEventListener("change", function(event) {
        let ele = event.target;
        validateItem(ele, false);
      });
    }
  }

  function handleFormSubmit(form) {
    if (validateForm(form) === 0) {
      form.submit();
    }
  }

  function validateForm(form) {

    let inputs = form.getElementsByTagName("input");
    let error = 0;
    for (let i = inputs.length - 1; i >= 0; i--) {
      error += validateItem(inputs[i], true);
    }

    return error;
  }

  function validateItem(ele, focus) {
    let type = ele.getAttribute("type");
    let error = validate(type, ele);
    let itemGroup = closestParent(ele, "text-field");
    removePreviousError(itemGroup);


    if (error) {

      let block = document.createElement("span");
      block.classList.add("help-block");
      block.classList.add("error");
      block.innerText = error;
      itemGroup.appendChild(block);
      if (type !== "checkbox") {
        itemGroup.querySelector(".text-field__input").classList.add("has-error");
      }


      if (focus) {
        ele.focus();
        window.scrollBy({
          top: -70, // could be negative value
          left: 0,
          behavior: "smooth"
        });
      }
      return 1;
    }
    return 0;
  }

  function validate(type, ele) {
    if (ele.dataset.validation !== "required") {
      return;
    };
    switch (type) {
      case "text":
        if (isBlank(ele.value)) {
          return "必須項目です";
        } else {
          return null;
        }
      case "email":
        if (isBlank(ele.value)) {
          return "必須項目です";
        } else if (!isValidateEmail(ele.value)) {
          return "メールアドレスが正しくありません";
        } else {
          return null;
        }
      case "tel":
        if (isBlank(ele.value)) {
          return "必須項目です";
        } else {
          return null;
        }
      case "checkbox":
        if ("個人情報の取扱いに同意" === ele.getAttribute("name")) {
          if (!ele.checked) {
            return "同意が必要です";
          }
        } else {
          return null;
        }

    }
  }


  function isBlank(value) {
    return (!value || 0 === value.length || /^\s*$/.test(value));
  }

  function isValidateEmail(value) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  function closestParent(child, className) {
    if (!child || child === document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function removePreviousError(itemGroup) {

    if (itemGroup) {
      let errors = itemGroup.querySelectorAll(".help-block");
      // inputにつけた色をなくす
      let inputs = itemGroup.getElementsByTagName("input");

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("has-error");
      }

      for (let i = 0; i < errors.length; i++) {
        itemGroup.removeChild(errors.item(i));
      }
    }

  }

})();
