import React, { useEffect, useState } from "react";
import HorizontalLessonList from "../../components/HorizontalLessonList/HorizontalLessonList";
import { axiosInstance } from "../../api";
import routes from "../../api/apiRoutes";
import { Lesson, Page } from "../../interfaces";
import { AxiosError } from "axios";

const LessonsPage = () => {
  const [data, setData] = useState<Page<Lesson>>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();
  useEffect(() => {
    if (isLoading) {
      axiosInstance
        .get<Page<Lesson>>(`${routes.LESSONS_URL}`)
        .then((response) => setData(response.data))
        .catch((reason) => setError(reason))
        .finally(() => setLoading(false));
    }
  });

  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h3>{error.message}</h3>;
  return <HorizontalLessonList items={data!.items} />;
};

export default LessonsPage;
