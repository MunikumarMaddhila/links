import { localHttp } from "./http";

export const LinksService = {
  /**
   * GET /api/pages/{pageId}/links
   * Fetch all links for a page (proxied through Next.js API route)
   */
  getLinks: (pageId: string) =>
    localHttp.get(`/api/pages/${pageId}/links`),

  /**
   * POST /api/pages/{pageId}/links
   * Create a new link (proxied through Next.js API route)
   */
  createLink: (pageId: string, data: { icon: string; iconName: string; title: string; url: string }) =>
    localHttp.post(`/api/pages/${pageId}/links`, data),

  /**
   * PUT /api/pages/{pageId}/links
   * Update an existing link (proxied through Next.js API route)
   */
  updateLink: (pageId: string, data: { linkId: string; icon: string; iconName: string; title: string; url: string }) =>
    localHttp.put(`/api/pages/${pageId}/links`, data),

  /**
   * DELETE /api/pages/{pageId}/links/{linkId}
   * Delete a link (proxied through Next.js API route)
   */
  deleteLink: (pageId: string, linkId: string) =>
    localHttp.delete(`/api/pages/${pageId}/links/${linkId}`),
};
