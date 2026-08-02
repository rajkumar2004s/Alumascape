
import { projects } from "../data/projects";

export function useProjects() {
  return { projects, loading: false, error: null };
}

export function useProject(slug) {
  const project = projects.find((p) => p.slug === slug);
  return { project, loading: false, error: null };
}
