import { http } from "./http";

export const LinksService = {
  /**
   * GET /api/pages/{pageId}/links
   * Fetch all links for a page
   */
  getLinks: (pageId: string) =>
    http.get(`/api/pages/${pageId}/links`),

  /**
   * POST /api/pages/{pageId}/links
   * Create a new link
   */
  createLink: (pageId: string, data: { icon: string; iconName: string; title: string; url: string }) =>
    http.post(`/api/pages/${pageId}/links`, data),

  /**
   * PUT /api/pages/{pageId}/links
   * Update an existing link
   */
  updateLink: (pageId: string, data: { linkId: string; icon: string; iconName: string; title: string; url: string }) =>
    http.put(`/api/pages/${pageId}/links`, data),

  /**
   * DELETE /api/pages/{pageId}/links/{linkId}
   * Delete a link
   */
  deleteLink: (pageId: string, linkId: string) =>
    http.delete(`/api/pages/${pageId}/links/${linkId}`),
};
