const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

displayCourses(courses);

function displayCourses(courseArray) {

    const courseCards = document.querySelector('.courses');
    const courseTotal = document.querySelector('#credit-total');

    courseCards.innerHTML = "";

    courseArray.forEach((course) => {
        const cCard = document.createElement('figure');

        const cContent = document.createElement('p');
        cContent.textContent = `${course.subject} ${course.number}`;
        cCard.appendChild(cContent);

        courseCards.appendChild(cCard);

        if (course.completed === true) {
            cContent.textContent = `✓ ${course.subject} ${course.number}`;
            cCard.classList.add('completed');
        }

        cCard.addEventListener('click', () => {
            displayModal(course);
        })

    });

    courseTotal.textContent = "";
    const totalCredits = courseArray.reduce((runningTotal, course) => runningTotal + course.credits, 0);
    courseTotal.textContent = `The total number of course credits listed below is ${totalCredits}`;

};

const filters = document.querySelector('.filters');

filters.addEventListener('click', (event) => {

    let filterCourses = courses;

    if (event.target.id === "wdd-Courses") {
        filterCourses = courses.filter(course => {
            return course.subject === "WDD";
        });
    }
    else if (event.target.id === "cse-Courses") {
        filterCourses = courses.filter(course => {
            return course.subject === "CSE";
        });
    };

    displayCourses(filterCourses);
});

function displayModal(course) {
    const myModal = document.querySelector('#courseModal');
    myModal.innerHTML = '';

    let title = document.createElement('h2');
    title.classList.add('modalTitle');
    title.textContent = `${course.subject} ${course.number}`;
    let header = document.createElement('h2');
    header.classList.add('modalHeader');
    header.textContent = course.title;
    let credits = document.createElement('p');
    credits.textContent = `${course.credits} credits`;
    let certificate = document.createElement('p');
    certificate.textContent = `Certificate: ${course.certificate}`;
    let description = document.createElement('p');
    description.textContent = course.description;
    let tech = document.createElement('p');
    tech.textContent = `Technology: ${course.technology.join(', ')}`;
    let modalButton = document.createElement('button');
    modalButton.textContent = '❌';

    myModal.appendChild(title);
    myModal.appendChild(header);
    myModal.appendChild(credits);
    myModal.appendChild(certificate);
    myModal.appendChild(description);
    myModal.appendChild(tech);
    myModal.appendChild(modalButton);

    modalButton.addEventListener('click', () => {
        myModal.close();
    });

    myModal.addEventListener('click', (event) => {
        if (event.target === myModal){
            myModal.close();
        }
    });

    myModal.showModal();
}

