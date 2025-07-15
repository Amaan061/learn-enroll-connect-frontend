const API_BASE_URL = 'https://student-backend-z7l7.onrender.com/api'

// Types
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

// API functions
export const api = {
  // Course Types
  courseTypes: {
    getAll: async (): Promise<CourseType[]> => {
      const response = await fetch(`${API_BASE_URL}/course-types`)
      if (!response.ok) throw new Error('Failed to fetch course types')
      return response.json()
    },
    
    create: async (name: string): Promise<CourseType> => {
      const response = await fetch(`${API_BASE_URL}/course-types`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!response.ok) throw new Error('Failed to create course type')
      return response.json()
    },
    
    update: async (id: string, name: string): Promise<CourseType> => {
      const response = await fetch(`${API_BASE_URL}/course-types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!response.ok) throw new Error('Failed to update course type')
      return response.json()
    },
    
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/course-types/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete course type')
    }
  },

  // Courses
  courses: {
    getAll: async (): Promise<Course[]> => {
      const response = await fetch(`${API_BASE_URL}/courses`)
      if (!response.ok) throw new Error('Failed to fetch courses')
      return response.json()
    },
    
    create: async (name: string): Promise<Course> => {
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!response.ok) throw new Error('Failed to create course')
      return response.json()
    },
    
    update: async (id: string, name: string): Promise<Course> => {
      const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!response.ok) throw new Error('Failed to update course')
      return response.json()
    },
    
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete course')
    }
  },

  // Course Offerings
  courseOfferings: {
    getAll: async (): Promise<CourseOffering[]> => {
      const response = await fetch(`${API_BASE_URL}/course-offerings`)
      if (!response.ok) throw new Error('Failed to fetch course offerings')
      return response.json()
    },
    
    create: async (course: string, courseType: string): Promise<CourseOffering> => {
      const response = await fetch(`${API_BASE_URL}/course-offerings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, courseType })
      })
      if (!response.ok) throw new Error('Failed to create course offering')
      return response.json()
    },
    
    update: async (id: string, course: string, courseType: string): Promise<CourseOffering> => {
      const response = await fetch(`${API_BASE_URL}/course-offerings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, courseType })
      })
      if (!response.ok) throw new Error('Failed to update course offering')
      return response.json()
    },
    
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/course-offerings/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete course offering')
    }
  },

  // Student Registrations
  registrations: {
    register: async (studentName: string, courseOffering: string): Promise<StudentRegistration> => {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, courseOffering })
      })
      if (!response.ok) throw new Error('Failed to register student')
      return response.json()
    },
    
    getByOffering: async (offeringId: string): Promise<StudentRegistration[]> => {
      const response = await fetch(`${API_BASE_URL}/registrations/offering/${offeringId}`)
      if (!response.ok) throw new Error('Failed to fetch registrations')
      return response.json()
    },
    
    getOfferingsByType: async (courseTypeId: string): Promise<CourseOffering[]> => {
      const response = await fetch(`${API_BASE_URL}/registrations/offerings/type/${courseTypeId}`)
      if (!response.ok) throw new Error('Failed to fetch course offerings by type')
      return response.json()
    }
  }
}