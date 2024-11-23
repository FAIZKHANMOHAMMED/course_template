fetch('data.json')
  .then(response => response.json())
  .then(data => renderContent(data))
  .catch(error => console.error('Error loading JSON:', error));

function renderContent(data) {
  const app = document.getElementById('content');
  app.innerHTML = ''; 
  if (data.header) {
    const header = document.createElement('h1');
    header.textContent = data.header;
    app.appendChild(header);
  }

  if (data.content) {
    data.content.forEach(item => {
      if (item.type === 'heading') {
        const heading = document.createElement(`h${item.level}`);
        heading.textContent = item.text;
        app.appendChild(heading);
      } else if (item.type === 'paragraph') {
        const paragraph = document.createElement('p');
        paragraph.textContent = item.text;
        app.appendChild(paragraph);
      } else if (item.type === 'form') {
        const form = document.createElement('form');
        item.elements.forEach(element => {
          const formGroup = document.createElement('div');
          formGroup.style.marginBottom = '15px';

          if (element.type === 'text' || element.type === 'email') {
            const label = document.createElement('label');
            label.textContent = element.label;
            formGroup.appendChild(label);

            const input = document.createElement('input');
            input.type = element.type;
            input.placeholder = element.placeholder;
            input.style.display = 'block';
            input.style.marginTop = '5px';
            formGroup.appendChild(input);
          } else if (element.type === 'checkbox') {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = element.name;
            input.checked = element.checked;
            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${element.label}`));
            formGroup.appendChild(label);
          } else if (element.type === 'radio') {
            const label = document.createElement('label');
            label.textContent = element.label;
            formGroup.appendChild(label);
            element.options.forEach(option => {
              const radioLabel = document.createElement('label');
              const input = document.createElement('input');
              input.type = 'radio';
              input.name = element.name;
              input.value = option.value;
              radioLabel.appendChild(input);
              radioLabel.appendChild(document.createTextNode(` ${option.label}`));
              formGroup.appendChild(radioLabel);
              formGroup.appendChild(document.createElement('br'));
            });
          } else if (element.type === 'select') {
            const label = document.createElement('label');
            label.textContent = element.label;
            formGroup.appendChild(label);

            const select = document.createElement('select');
            element.options.forEach(option => {
              const opt = document.createElement('option');
              opt.value = option.value;
              opt.textContent = option.label;
              select.appendChild(opt);
            });
            formGroup.appendChild(select);
          } else if (element.type === 'textarea') {
            const label = document.createElement('label');
            label.textContent = element.label;
            formGroup.appendChild(label);

            const textarea = document.createElement('textarea');
            textarea.placeholder = element.placeholder;
            textarea.style.display = 'block';
            textarea.style.marginTop = '5px';
            formGroup.appendChild(textarea);
          } else if (element.type === 'button') {
            const button = document.createElement('button');
            button.textContent = element.text;
            button.className = 'button';
            button.setAttribute('onclick', element.action);
            formGroup.appendChild(button);
          }

          form.appendChild(formGroup);
        });
        app.appendChild(form);
      }
    });
  }
}
