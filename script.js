// Function to add data and image to localStorage
function addData() {
    const dataInput = document.getElementById('dataInput');
    const data = dataInput.value;
    const imageInput = document.getElementById('imageInput');
    const image = imageInput.files[0];
  
    if (data) {
      // Retrieve existing data from localStorage
      const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];
  
      // Find the index of existing data, if it exists
      const existingIndex = existingData.findIndex(item => item.data === data);
  
      if (existingIndex !== -1) {
        // If the data already exists, increase the counter
        existingData[existingIndex].count = (existingData[existingIndex].count || 1) + 1;
      } else {
        // If the data is new, create a new item
        const newItem = {
          data: data,
          image: image ? URL.createObjectURL(image) : null,
          count: 1, // Initialize the counter
        };
        existingData.push(newItem);
      }
  
      // Store the updated data in localStorage
      localStorage.setItem('dashboardData', JSON.stringify(existingData));
  
      // Clear the input fields
      dataInput.value = '';
      imageInput.value = '';
  
      // Update the displayed data
      displayData();
    }
  }
  
  // Function to delete data item
  function deleteData(index) {
    const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];
  
    existingData.splice(index, 1);
  
    localStorage.setItem('dashboardData', JSON.stringify(existingData));
  
    displayData();
  }
  
  // Function to display stored data
  function displayData() {
    const dataList = document.getElementById('dataList');
  
    const storedData = localStorage.getItem('dashboardData');
  
    if (storedData) {
      const dataArr = JSON.parse(storedData);
      dataList.innerHTML = '';
  
      dataArr.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <div class="image-container">
            ${item.image ? `<img src="${item.image}" alt="Image" width="100">` : ''}
          </div>
          <div>
            ${index + 1}. ${item.data}
          </div>
          <div class="quantity">
            Quantity: ${item.count || 1}
          </div>
          <span class="delete-button" onclick="deleteData(${index})">Delete</span>
        `;
  
        dataList.appendChild(listItem);
      });
    }
  }
  
  // Function to preview image before adding
  function previewImage() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
  
    if (imageInput.files.length > 0) {
      const image = imageInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
  
      reader.readAsDataURL(image);
    }
  }
  
  // Initial display of stored data
  displayData();
  
