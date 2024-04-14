interface NavItemType {
  name: string;
  href: Parameters<typeof Link>[0]["href"];
  isActive?: boolean;
  disabled?: boolean;
}

interface AgreementType {
  title: string;
  href: string;
  className?: string;
}