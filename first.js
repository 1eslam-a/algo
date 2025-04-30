document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 20 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.3 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }


    function createFloatingShapes() {
        const shapesContainer = document.querySelector('.floating-shapes');
        const shapeCount = 5;
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            shape.classList.add('floating-shape');
            
            const size = Math.random() * 200 + 100;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 25 + 15;
            const delay = Math.random() * 10;
            const blur = Math.random() * 10 + 5;
            const borderRadius = `${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}%`;
            
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${posX}%`;
            shape.style.top = `${posY}%`;
            shape.style.borderRadius = borderRadius;
            shape.style.animationDuration = `${duration}s`;
            shape.style.animationDelay = `${delay}s`;
            shape.style.filter = `blur(${blur}px)`;
            
            if (i % 3 === 0) {
                shape.style.background = 'linear-gradient(135deg, rgba(76, 81, 191, 0.1), transparent)';
            } else if (i % 3 === 1) {
                shape.style.background = 'radial-gradient(circle, rgba(129, 230, 217, 0.1), transparent)';
            } else {
                shape.style.background = 'linear-gradient(45deg, rgba(237, 100, 166, 0.1), transparent)';
            }
            
            shapesContainer.appendChild(shape);
        }
    }

    createParticles();
    createFloatingShapes();

    const arrayInput = document.getElementById('arrayInput');
    const searchValue = document.getElementById('searchValue');
    const linearSearchBtn = document.getElementById('linearSearchBtn');
    const binarySearchBtn = document.getElementById('binarySearchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const arrayContainer = document.getElementById('arrayContainer');
    const resultDisplay = document.getElementById('resultDisplay');

    let array = [];
    let isSearching = false;

    function init() {
        renderArray();
        addEventListeners();
    }

    function renderArray(arr = array) {
        arrayContainer.innerHTML = '';
        arr.forEach((num, index) => {
            const box = document.createElement('div');
            box.className = 'array-box';
            box.textContent = num;
            box.dataset.index = index;
            box.dataset.value = num;
            
            const indexLabel = document.createElement('div');
            indexLabel.className = 'array-index';
            indexLabel.textContent = index;
            
            box.appendChild(indexLabel);
            arrayContainer.appendChild(box);
        });
    }

    function addEventListeners() {
        arrayInput.addEventListener('input', function() {
            array = this.value.split(',').map(item => parseInt(item.trim())).filter(item => !isNaN(item));
            renderArray();
        });

        linearSearchBtn.addEventListener('click', performLinearSearch);
        binarySearchBtn.addEventListener('click', performBinarySearch);
        resetBtn.addEventListener('click', resetSearch);
    }

    async function performLinearSearch() {
        if (isSearching) return;
        isSearching = true;
        
        const target = parseInt(searchValue.value);
        if (isNaN(target)) {
            showResult("Please enter a valid number to search", "error");
            isSearching = false;
            return;
        }
    
        const boxes = document.querySelectorAll('.array-box');
        let found = false;
        let steps = 0;
    
        for (let i = 0; i < boxes.length; i++) {
            steps++;
            const box = boxes[i];
            box.classList.add('active', 'current');
            
            await sleep(600);
            
            if (parseInt(box.dataset.value) === target) {
                box.classList.remove('current');
                box.classList.add('found');
                showResult(`Found at index ${i}`, "success");
                found = true;
                setTimeout(() => {
                    showAlgorithmExplanation('linear', steps, i);
                }, 1000);
                break;
            } else {
                box.classList.remove('current');
                box.classList.add('checked');
            }
        }
    
        if (!found) {
            showResult("Not found (-1)", "error");
        }
        
        isSearching = false;
    }

    async function performBinarySearch() {
        if (isSearching) return;
        isSearching = true;
        
        const target = parseInt(searchValue.value);
        if (isNaN(target)) {
            showResult("Please enter a valid number to search", "error");
            isSearching = false;
            return;
        }
    
        const sortedArray = [...array].sort((a, b) => a - b);
        renderArray(sortedArray);
        await sleep(1000);
    
        const boxes = document.querySelectorAll('.array-box');
        let left = 0;
        let right = boxes.length - 1;
        let found = false;
        let steps = 0;
    
        while (left <= right) {
            steps++;
            const mid = Math.floor((left + right) / 2);
            const midBox = boxes[mid];
            
            midBox.classList.add('active', 'current');
            await sleep(800);
            
            const midValue = parseInt(midBox.dataset.value);
            
            if (midValue === target) {
                midBox.classList.remove('current');
                midBox.classList.add('found');
                showResult(`Found at index ${mid} (sorted array)`, "success");
                found = true;
                setTimeout(() => {
                    showAlgorithmExplanation('binary', steps, mid);
                }, 1000);
                break;
            } else if (midValue < target) {
                for (let i = left; i <= mid; i++) {
                    boxes[i].classList.add('checked');
                }
                left = mid + 1;
            } else {
                for (let i = mid; i <= right; i++) {
                    boxes[i].classList.add('checked');
                }
                right = mid - 1;
            }
            
            midBox.classList.remove('current');
            await sleep(300);
        }
    
        if (!found) {
            showResult("Not found (-1)", "error");
        }
        
        isSearching = false;
    }

    function resetSearch() {
        isSearching = false;
        renderArray();
        resultDisplay.textContent = '';
        searchValue.value = '';
    }

    function showResult(message, type) {
        resultDisplay.textContent = message;
        resultDisplay.className = 'result-display';
        resultDisplay.classList.add(type);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    init();
});

function showAlgorithmExplanation(algorithm, steps, foundAt) {
    const explanation = document.getElementById('algorithmExplanation');
    const title = document.getElementById('explanationTitle');
    const text = document.getElementById('explanationText');
    
    if (algorithm === 'linear') {
      title.textContent = 'Linear Search Explanation';
      text.innerHTML = `
        <p><span class="highlight">Linear Search</span> is the simplest way to find an element in a list.</p>
        <p>1. Start from the first element.</p>
        <p>2. Check each element one by one.</p>
        <p>3. If you find the target → return its position (${foundAt}).</p>
        <p>4. If you reach the end without finding it → it's not in the list.</p>
        <p><span class="highlight">Key Points:</span></p>
        <p>📌 No need for sorting.</p>
        <p>🐢 Time Complexity: O(n) — slower than binary search for large lists.</p>
        <p>🔍 Steps taken: ${steps}</p>
      `;
    } else {
      title.textContent = 'Binary Search Explanation';
      text.innerHTML = `
        <p><span class="highlight">Binary Search</span> is an efficient algorithm used to find an element in a sorted list.</p>
        <p>1. Look at the middle element of the list.</p>
        <p>2. If it's equal to the target → you've found it (position ${foundAt})!</p>
        <p>3. If the target is smaller → search the left half.</p>
        <p>4. If the target is greater → search the right half.</p>
        <p>5. Repeat until the element is found or the list is empty.</p>
        <p><span class="highlight">Key Points:</span></p>
        <p>📌 Requirement: The list must be sorted.</p>
        <p>⚡ Time Complexity: O(log n) — much faster than linear search.</p>
        <p>🔍 Steps taken: ${steps}</p>
      `;
    }
    
    explanation.classList.add('show');
    
    document.getElementById('closeExplanation').addEventListener('click', () => {
      explanation.classList.remove('show');
    });
  }


  window.addEventListener('load', function() {
    var audio = document.getElementById('myAudio');
    audio.play().catch(function(error) {
      console.log('ERROR', error);
    });
  });