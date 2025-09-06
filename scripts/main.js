document.addEventListener('DOMContentLoaded', () => {
    // --- Responsive Navigation ---
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.getElementById('nav-links');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });
    }

    // --- Footer Dates ---
    const currentYear = new Date().getFullYear();
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = currentYear;
    }


    const lastModifiedDate = document.lastModified;
    const lastModifiedEl = document.getElementById('lastModified');
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${lastModifiedDate}`;
    }


    // --- Course Data and Logic ---
    const courses = [
        { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
        { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
        { subject: 'WDD', number: 231, title: 'Frontend Development 1', credits: 2, completed: false }
    ];

    const courseGrid = document.getElementById('course-grid');
    const creditTotalEl = document.getElementById('credit-total');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    function displayCourses(filteredCourses) {
        if (!courseGrid || !creditTotalEl) return;
        // Clear current grid
        courseGrid.innerHTML = '';
        
        // Populate grid with new cards
        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            if (course.completed) {
                card.classList.add('completed');
            }
            card.textContent = `${course.subject} ${course.number}`;
            courseGrid.appendChild(card);
        });
        
        // Calculate and display total credits using reduce
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditTotalEl.textContent = `Total Credits for Shown Courses: ${totalCredits}`;
    }

    // --- Event Listeners for Filter Buttons ---
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Handle active button style
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.id.replace('filter-', ''); // 'all', 'cse', or 'wdd'
                
                let filteredCourses;
                if (filter === 'all') {
                    filteredCourses = courses;
                } else {
                    filteredCourses = courses.filter(course => course.subject.toLowerCase() === filter);
                }
                
                displayCourses(filteredCourses);
            });
        });
    }

    // Initial display of all courses on page load
    if (courseGrid) {
        displayCourses(courses);
    }
});

