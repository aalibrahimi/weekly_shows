import { create } from 'zustand';

interface FormDataState {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  service: string
  setService: (service: string) => void
  projectDetails: string
  setProjectDetails: (projectDetails: string) => void
}

export const useFormDataStore = create<FormDataState>()((set) => ({
  name: '',
  setName: (name: string) => set({ name }),
  email: '',
  setEmail: (email: string) => set({ email }),
  service: '',
  setService: (service: string) => set({ service }),
  projectDetails: '',
  setProjectDetails: (projectDetails: string) => set({ projectDetails }),
}));
