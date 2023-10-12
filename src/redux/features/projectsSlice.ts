import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { iProject } from '@/types/Project';

interface ProjectsState {
  selectedProject: iProject | undefined;
}

const initialState: ProjectsState = {
  selectedProject: undefined,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<iProject>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;
