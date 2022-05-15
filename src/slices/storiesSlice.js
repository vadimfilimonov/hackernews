/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

export const fetchStories = createAsyncThunk('stories/fetchStories', api.fetchStories);
export const fetchComments = createAsyncThunk('stories/fetchComments', api.fetchComments);
export const fetchItem = createAsyncThunk('stories/fetchStory', api.fetchItem);

const storiesAdapter = createEntityAdapter();

const initialState = storiesAdapter.getInitialState({ status: 'idle', error: null });

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, { payload }) => {
        storiesAdapter.addMany(state, payload);
        state.status = 'idle';
        state.error = null;
      })
      // TODO: extract comments into other slice
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        storiesAdapter.addMany(state, payload);
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchItem.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, { payload }) => {
        storiesAdapter.addOne(state, payload);
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const selectors = storiesAdapter.getSelectors((state) => state.stories);
export default storiesSlice.reducer;
