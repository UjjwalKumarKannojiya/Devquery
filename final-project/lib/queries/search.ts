import { useQuery } from "@tanstack/react-query";
import { queryKeys, apiRequest, type QuestionWithAuthor, type AnswerWithAuthor, type User } from "@/lib/api";

export interface SearchResponse {
  data: {
    questions: QuestionWithAuthor[];
    answers: AnswerWithAuthor[];
    users: User[];
  };
}

const search = async (query: string): Promise<SearchResponse> =>
  apiRequest(`/api/search?q=${encodeURIComponent(query)}`);

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.questions.search(query),
    queryFn: () => search(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 2, 
  });
};
