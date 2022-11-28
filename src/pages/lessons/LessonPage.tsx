import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import routes from "../../api/apiRoutes";
import { Lesson } from "../../interfaces";
import { AxiosError } from "axios";
import { useParams } from 'react-router-dom';
import { IMAGE_BASE_URL } from "../../constants";
import { LessonContent } from "../../components/LessonContent";

const LessonPage = () => {
  const [lesson, setLesson] = useState<Lesson>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();
  
  const { id } = useParams()
  
  useEffect(() => {
    if (isLoading) {
      axiosInstance
        .get<Lesson>(`${routes.LESSONS_URL}/${id}`)
        .then((response) => setLesson(response.data))
        .catch((reason) => setError(reason))
        .finally(() => setLoading(false));
    }
  });

  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h3>{error.message}</h3>;

  return <div>
  <h1>{lesson!.title}</h1>
  <div>{lesson!.tags.map(t=><div>{t.tagName}</div>)}</div>
  <h2>{lesson!.author.fullName}</h2>
  <h3>{new Date(lesson!.creationDate.substring(0, lesson!.creationDate.indexOf('.'))+'Z').toDateString()}</h3>
  <h3>{lesson!.views} views</h3>
  <h3>{lesson!.upvotes} upvotes</h3>
  <h3>{lesson!.downvotes} downvotes</h3>
  <img src={IMAGE_BASE_URL+lesson!.imageUrl} />
  <LessonContent content={lesson!.content} />
</div>;
};

export default LessonPage;