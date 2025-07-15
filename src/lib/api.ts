
// Sample data instead of API calls since backend is not working
export interface CourseType {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Course {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CourseOffering {
  _id: string
  course: string | Course
  courseType: string | CourseType
  createdAt: string
  updatedAt: string
  __v: number
}

export interface StudentRegistration {
  _id: string
  studentName: string
  courseOffering: string | CourseOffering
  createdAt: string
  updatedAt: string
  __v: number
}

// Sample data
const sampleCourseTypes: CourseType[] = [
  { _id: "ct1", name: "Individual", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z", __v: 0 },
  { _id: "ct2", name: "Group", createdAt: "2024-01-16T10:00:00Z", updatedAt: "2024-01-16T10:00:00Z", __v: 0 },
  { _id: "ct3", name: "Weekend Batch", createdAt: "2024-01-17T10:00:00Z", updatedAt: "2024-01-17T10:00:00Z", __v: 0 },
  { _id: "ct4", name: "Evening Classes", createdAt: "2024-01-18T10:00:00Z", updatedAt: "2024-01-18T10:00:00Z", __v: 0 },
  { _id: "ct5", name: "Intensive Course", createdAt: "2024-01-19T10:00:00Z", updatedAt: "2024-01-19T10:00:00Z", __v: 0 }
]

const sampleCourses: Course[] = [
  { _id: "c1", name: "Mathematics", createdAt: "2024-01-20T10:00:00Z", updatedAt: "2024-01-20T10:00:00Z", __v: 0 },
  { _id: "c2", name: "English", createdAt: "2024-01-21T10:00:00Z", updatedAt: "2024-01-21T10:00:00Z", __v: 0 },
  { _id: "c3", name: "Hindi", createdAt: "2024-01-22T10:00:00Z", updatedAt: "2024-01-22T10:00:00Z", __v: 0 },
  { _id: "c4", name: "Physics", createdAt: "2024-01-23T10:00:00Z", updatedAt: "2024-01-23T10:00:00Z", __v: 0 },
  { _id: "c5", name: "Chemistry", createdAt: "2024-01-24T10:00:00Z", updatedAt: "2024-01-24T10:00:00Z", __v: 0 },
  { _id: "c6", name: "Biology", createdAt: "2024-01-25T10:00:00Z", updatedAt: "2024-01-25T10:00:00Z", __v: 0 },
  { _id: "c7", name: "Computer Science", createdAt: "2024-01-26T10:00:00Z", updatedAt: "2024-01-26T10:00:00Z", __v: 0 },
  { _id: "c8", name: "History", createdAt: "2024-01-27T10:00:00Z", updatedAt: "2024-01-27T10:00:00Z", __v: 0 },
  { _id: "c9", name: "Geography", createdAt: "2024-01-28T10:00:00Z", updatedAt: "2024-01-28T10:00:00Z", __v: 0 },
  { _id: "c10", name: "Economics", createdAt: "2024-01-29T10:00:00Z", updatedAt: "2024-01-29T10:00:00Z", __v: 0 }
]

const sampleCourseOfferings: CourseOffering[] = [
  { _id: "co1", course: "c1", courseType: "ct1", createdAt: "2024-02-01T10:00:00Z", updatedAt: "2024-02-01T10:00:00Z", __v: 0 },
  { _id: "co2", course: "c1", courseType: "ct2", createdAt: "2024-02-02T10:00:00Z", updatedAt: "2024-02-02T10:00:00Z", __v: 0 },
  { _id: "co3", course: "c2", courseType: "ct1", createdAt: "2024-02-03T10:00:00Z", updatedAt: "2024-02-03T10:00:00Z", __v: 0 },
  { _id: "co4", course: "c2", courseType: "ct3", createdAt: "2024-02-04T10:00:00Z", updatedAt: "2024-02-04T10:00:00Z", __v: 0 },
  { _id: "co5", course: "c3", courseType: "ct2", createdAt: "2024-02-05T10:00:00Z", updatedAt: "2024-02-05T10:00:00Z", __v: 0 },
  { _id: "co6", course: "c4", courseType: "ct4", createdAt: "2024-02-06T10:00:00Z", updatedAt: "2024-02-06T10:00:00Z", __v: 0 },
  { _id: "co7", course: "c5", courseType: "ct1", createdAt: "2024-02-07T10:00:00Z", updatedAt: "2024-02-07T10:00:00Z", __v: 0 },
  { _id: "co8", course: "c6", courseType: "ct2", createdAt: "2024-02-08T10:00:00Z", updatedAt: "2024-02-08T10:00:00Z", __v: 0 },
  { _id: "co9", course: "c7", courseType: "ct5", createdAt: "2024-02-09T10:00:00Z", updatedAt: "2024-02-09T10:00:00Z", __v: 0 },
  { _id: "co10", course: "c8", courseType: "ct3", createdAt: "2024-02-10T10:00:00Z", updatedAt: "2024-02-10T10:00:00Z", __v: 0 },
  { _id: "co11", course: "c9", courseType: "ct4", createdAt: "2024-02-11T10:00:00Z", updatedAt: "2024-02-11T10:00:00Z", __v: 0 },
  { _id: "co12", course: "c10", courseType: "ct1", createdAt: "2024-02-12T10:00:00Z", updatedAt: "2024-02-12T10:00:00Z", __v: 0 },
  { _id: "co13", course: "c3", courseType: "ct5", createdAt: "2024-02-13T10:00:00Z", updatedAt: "2024-02-13T10:00:00Z", __v: 0 },
  { _id: "co14", course: "c5", courseType: "ct3", createdAt: "2024-02-14T10:00:00Z", updatedAt: "2024-02-14T10:00:00Z", __v: 0 },
  { _id: "co15", course: "c7", courseType: "ct2", createdAt: "2024-02-15T10:00:00Z", updatedAt: "2024-02-15T10:00:00Z", __v: 0 }
]

const sampleRegistrations: StudentRegistration[] = [
  { _id: "sr1", studentName: "John Smith", courseOffering: "co1", createdAt: "2024-03-01T10:00:00Z", updatedAt: "2024-03-01T10:00:00Z", __v: 0 },
  { _id: "sr2", studentName: "Sarah Johnson", courseOffering: "co1", createdAt: "2024-03-02T10:00:00Z", updatedAt: "2024-03-02T10:00:00Z", __v: 0 },
  { _id: "sr3", studentName: "Mike Davis", courseOffering: "co2", createdAt: "2024-03-03T10:00:00Z", updatedAt: "2024-03-03T10:00:00Z", __v: 0 },
  { _id: "sr4", studentName: "Emma Wilson", courseOffering: "co2", createdAt: "2024-03-04T10:00:00Z", updatedAt: "2024-03-04T10:00:00Z", __v: 0 },
  { _id: "sr5", studentName: "David Brown", courseOffering: "co3", createdAt: "2024-03-05T10:00:00Z", updatedAt: "2024-03-05T10:00:00Z", __v: 0 },
  { _id: "sr6", studentName: "Lisa Garcia", courseOffering: "co4", createdAt: "2024-03-06T10:00:00Z", updatedAt: "2024-03-06T10:00:00Z", __v: 0 },
  { _id: "sr7", studentName: "James Miller", courseOffering: "co4", createdAt: "2024-03-07T10:00:00Z", updatedAt: "2024-03-07T10:00:00Z", __v: 0 },
  { _id: "sr8", studentName: "Jennifer Taylor", courseOffering: "co5", createdAt: "2024-03-08T10:00:00Z", updatedAt: "2024-03-08T10:00:00Z", __v: 0 },
  { _id: "sr9", studentName: "Robert Anderson", courseOffering: "co6", createdAt: "2024-03-09T10:00:00Z", updatedAt: "2024-03-09T10:00:00Z", __v: 0 },
  { _id: "sr10", studentName: "Maria Rodriguez", courseOffering: "co6", createdAt: "2024-03-10T10:00:00Z", updatedAt: "2024-03-10T10:00:00Z", __v: 0 },
  { _id: "sr11", studentName: "William Jones", courseOffering: "co7", createdAt: "2024-03-11T10:00:00Z", updatedAt: "2024-03-11T10:00:00Z", __v: 0 },
  { _id: "sr12", studentName: "Jessica White", courseOffering: "co8", createdAt: "2024-03-12T10:00:00Z", updatedAt: "2024-03-12T10:00:00Z", __v: 0 },
  { _id: "sr13", studentName: "Christopher Lee", courseOffering: "co8", createdAt: "2024-03-13T10:00:00Z", updatedAt: "2024-03-13T10:00:00Z", __v: 0 },
  { _id: "sr14", studentName: "Amanda Martinez", courseOffering: "co9", createdAt: "2024-03-14T10:00:00Z", updatedAt: "2024-03-14T10:00:00Z", __v: 0 },
  { _id: "sr15", studentName: "Daniel Wilson", courseOffering: "co9", createdAt: "2024-03-15T10:00:00Z", updatedAt: "2024-03-15T10:00:00Z", __v: 0 },
  { _id: "sr16", studentName: "Ashley Clark", courseOffering: "co10", createdAt: "2024-03-16T10:00:00Z", updatedAt: "2024-03-16T10:00:00Z", __v: 0 },
  { _id: "sr17", studentName: "Matthew Lewis", courseOffering: "co11", createdAt: "2024-03-17T10:00:00Z", updatedAt: "2024-03-17T10:00:00Z", __v: 0 },
  { _id: "sr18", studentName: "Stephanie Hall", courseOffering: "co11", createdAt: "2024-03-18T10:00:00Z", updatedAt: "2024-03-18T10:00:00Z", __v: 0 },
  { _id: "sr19", studentName: "Kevin Young", courseOffering: "co12", createdAt: "2024-03-19T10:00:00Z", updatedAt: "2024-03-19T10:00:00Z", __v: 0 },
  { _id: "sr20", studentName: "Nicole King", courseOffering: "co12", createdAt: "2024-03-20T10:00:00Z", updatedAt: "2024-03-20T10:00:00Z", __v: 0 },
  { _id: "sr21", studentName: "Joshua Wright", courseOffering: "co13", createdAt: "2024-03-21T10:00:00Z", updatedAt: "2024-03-21T10:00:00Z", __v: 0 },
  { _id: "sr22", studentName: "Samantha Green", courseOffering: "co13", createdAt: "2024-03-22T10:00:00Z", updatedAt: "2024-03-22T10:00:00Z", __v: 0 },
  { _id: "sr23", studentName: "Andrew Adams", courseOffering: "co14", createdAt: "2024-03-23T10:00:00Z", updatedAt: "2024-03-23T10:00:00Z", __v: 0 },
  { _id: "sr24", studentName: "Melissa Baker", courseOffering: "co14", createdAt: "2024-03-24T10:00:00Z", updatedAt: "2024-03-24T10:00:00Z", __v: 0 },
  { _id: "sr25", studentName: "Ryan Nelson", courseOffering: "co15", createdAt: "2024-03-25T10:00:00Z", updatedAt: "2024-03-25T10:00:00Z", __v: 0 },
  { _id: "sr26", studentName: "Lauren Carter", courseOffering: "co15", createdAt: "2024-03-26T10:00:00Z", updatedAt: "2024-03-26T10:00:00Z", __v: 0 },
  { _id: "sr27", studentName: "Brandon Mitchell", courseOffering: "co1", createdAt: "2024-03-27T10:00:00Z", updatedAt: "2024-03-27T10:00:00Z", __v: 0 },
  { _id: "sr28", studentName: "Rachel Perez", courseOffering: "co2", createdAt: "2024-03-28T10:00:00Z", updatedAt: "2024-03-28T10:00:00Z", __v: 0 },
  { _id: "sr29", studentName: "Tyler Roberts", courseOffering: "co3", createdAt: "2024-03-29T10:00:00Z", updatedAt: "2024-03-29T10:00:00Z", __v: 0 },
  { _id: "sr30", studentName: "Hannah Turner", courseOffering: "co4", createdAt: "2024-03-30T10:00:00Z", updatedAt: "2024-03-30T10:00:00Z", __v: 0 }
]

// Helper function to simulate async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simulated API functions with sample data
export const api = {
  // Course Types
  courseTypes: {
    getAll: async (): Promise<CourseType[]> => {
      await delay(500) // Simulate network delay
      return [...sampleCourseTypes]
    },
    
    create: async (name: string): Promise<CourseType> => {
      await delay(500)
      const newCourseType: CourseType = {
        _id: `ct${Date.now()}`,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }
      sampleCourseTypes.push(newCourseType)
      return newCourseType
    },
    
    update: async (id: string, name: string): Promise<CourseType> => {
      await delay(500)
      const index = sampleCourseTypes.findIndex(ct => ct._id === id)
      if (index !== -1) {
        sampleCourseTypes[index] = {
          ...sampleCourseTypes[index],
          name,
          updatedAt: new Date().toISOString()
        }
        return sampleCourseTypes[index]
      }
      throw new Error('Course type not found')
    },
    
    delete: async (id: string): Promise<void> => {
      await delay(500)
      const index = sampleCourseTypes.findIndex(ct => ct._id === id)
      if (index !== -1) {
        sampleCourseTypes.splice(index, 1)
      }
    }
  },

  // Courses
  courses: {
    getAll: async (): Promise<Course[]> => {
      await delay(500)
      return [...sampleCourses]
    },
    
    create: async (name: string): Promise<Course> => {
      await delay(500)
      const newCourse: Course = {
        _id: `c${Date.now()}`,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }
      sampleCourses.push(newCourse)
      return newCourse
    },
    
    update: async (id: string, name: string): Promise<Course> => {
      await delay(500)
      const index = sampleCourses.findIndex(c => c._id === id)
      if (index !== -1) {
        sampleCourses[index] = {
          ...sampleCourses[index],
          name,
          updatedAt: new Date().toISOString()
        }
        return sampleCourses[index]
      }
      throw new Error('Course not found')
    },
    
    delete: async (id: string): Promise<void> => {
      await delay(500)
      const index = sampleCourses.findIndex(c => c._id === id)
      if (index !== -1) {
        sampleCourses.splice(index, 1)
      }
    }
  },

  // Course Offerings
  courseOfferings: {
    getAll: async (): Promise<CourseOffering[]> => {
      await delay(500)
      return [...sampleCourseOfferings]
    },
    
    create: async (course: string, courseType: string): Promise<CourseOffering> => {
      await delay(500)
      const newOffering: CourseOffering = {
        _id: `co${Date.now()}`,
        course,
        courseType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }
      sampleCourseOfferings.push(newOffering)
      return newOffering
    },
    
    update: async (id: string, course: string, courseType: string): Promise<CourseOffering> => {
      await delay(500)
      const index = sampleCourseOfferings.findIndex(co => co._id === id)
      if (index !== -1) {
        sampleCourseOfferings[index] = {
          ...sampleCourseOfferings[index],
          course,
          courseType,
          updatedAt: new Date().toISOString()
        }
        return sampleCourseOfferings[index]
      }
      throw new Error('Course offering not found')
    },
    
    delete: async (id: string): Promise<void> => {
      await delay(500)
      const index = sampleCourseOfferings.findIndex(co => co._id === id)
      if (index !== -1) {
        sampleCourseOfferings.splice(index, 1)
      }
    }
  },

  // Student Registrations
  registrations: {
    register: async (studentName: string, courseOffering: string): Promise<StudentRegistration> => {
      await delay(500)
      const newRegistration: StudentRegistration = {
        _id: `sr${Date.now()}`,
        studentName,
        courseOffering,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }
      sampleRegistrations.push(newRegistration)
      return newRegistration
    },
    
    getByOffering: async (offeringId: string): Promise<StudentRegistration[]> => {
      await delay(500)
      return sampleRegistrations.filter(sr => sr.courseOffering === offeringId)
    },
    
    getOfferingsByType: async (courseTypeId: string): Promise<CourseOffering[]> => {
      await delay(500)
      return sampleCourseOfferings.filter(co => co.courseType === courseTypeId)
    }
  }
}
