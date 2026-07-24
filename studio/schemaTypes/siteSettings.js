import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'inquiryEmail',
      title: 'Inquiry email',
      type: 'string',
      description: 'Replace studio@dickheads.shop in the site code before launch.'
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url'
    }),
    defineField({
      name: 'legalName',
      title: 'Legal name for imprint',
      type: 'string'
    }),
    defineField({
      name: 'legalAddress',
      title: 'Legal address',
      type: 'text',
      rows: 3
    })
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' };
    }
  }
});
