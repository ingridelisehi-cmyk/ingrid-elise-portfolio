import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portefølje')
    .items([
      S.documentTypeListItem('siteSettings').title('Nettstedsinnstillinger'),
      S.documentTypeListItem('project').title('Prosjekter'),
      S.documentTypeListItem('experience').title('Erfaring'),
      S.documentTypeListItem('education').title('Utdanning'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['siteSettings', 'project', 'experience', 'education'].includes(item.getId()!),
      ),
    ])
