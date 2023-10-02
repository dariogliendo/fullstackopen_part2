const Header = ({ name }) => {
  return (<h2>{name}</h2>)
}

const Part = ({ part }) => {
  return (
    <li>{part.name} - {part.exercises}</li>
  )
}

const Total = ({ parts }) => {
  function getTotal() {
    return parts.reduce((acc, part) => {
      if (isNaN(part.exercises)) return acc
      return acc + part.exercises
    }, 0)
  }   

  return (
    <div>
      <strong>Total exercises: </strong>
      <span>{getTotal()}</span>
    </div>
  )
}

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <ul>
              {course.parts.map(part => {
                return (
                  <Part key={part.id} part={part}></Part>
                )
              })}
            </ul>
            <Total parts={course.parts}></Total>
          </div>
        )
      })}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content courses={[course]}></Content>
    </div>
  )
}

export default Course