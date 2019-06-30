const coursesData = require('../couresData')

const updateCourseTopic = ({ id, topic }) => {
  // eslint-disable-next-line array-callback-return
  coursesData.map(course => {
    if (course.id === id) {
      course.topic = topic
      return course
    }
  })
  return coursesData.filter(course => course.id === id)[0]
}

module.exports = {
  updateCourseTopic,
}
