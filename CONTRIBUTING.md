# Contributing to SpeedType

Thank you for your interest in contributing to SpeedType! This document provides guidelines for contributing to our real-time multiplayer typing race game project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Version Control Workflow](#version-control-workflow)
3. [Development Setup](#development-setup)
4. [Code Review Standards](#code-review-standards)
5. [Pull Request Process](#pull-request-process)
6. [Coding Standards](#coding-standards)
7. [Testing Requirements](#testing-requirements)
8. [Deployment Process](#deployment-process)

## Getting Started

### Prerequisites

Before contributing, ensure you have:

#### Node.js (v18.19.1 or higher)
**Installation options:**
- **Direct download**: [nodejs.org/en/download](https://nodejs.org/en/download/)
- **Node Version Manager (recommended)**:
  ```bash
  # Install nvm (Linux/macOS)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # Install and use Node.js 18
  nvm install 18
  nvm use 18
  ```
- **Package managers**:
  - **macOS**: `brew install node@18`
  - **Ubuntu/Debian**: `sudo apt install nodejs npm`
  - **Windows**: `winget install OpenJS.NodeJS`

#### npm (v6 or higher)
**Usually comes with Node.js, but can be updated:**
```bash
npm install -g npm@latest
```

#### Git
**Installation options:**
- **Official installer**: [git-scm.com/downloads](https://git-scm.com/downloads)
- **Package managers**:
  - **macOS**: `brew install git`
  - **Ubuntu/Debian**: `sudo apt install git`
  - **Windows**: `winget install Git.Git`

#### GitHub Account
- Sign up at [github.com](https://github.com)

### Project Structure

```
SpeedType/
├── backend/                 # Node.js + Express + Socket.IO backend
├── frontend/               # React + Vite frontend
├── .github/workflows/      # CI/CD workflows
├── docs/                   # Documentation
└── README.md              # Project overview
```

## Version Control Workflow

### Branching Model

We follow a **GitFlow-inspired** branching strategy with the following branches:

#### Main Branches
- **`main`**: Production-ready code
  - Always stable and deployable
  - Protected branch requiring PR reviews
  - Automatically deploys to production

#### Supporting Branches
- **`feature/*`**: New features and enhancements
  - Branch from: `main`
  - Merge to: `main` via Pull Request
  - Naming: `feature/descriptive-name`
  - Examples: `feature/user-authentication`, `feature/modular-ai-providers`

- **`fix/*`**: Bug fixes
  - Branch from: `main`
  - Merge to: `main` via Pull Request
  - Naming: `fix/descriptive-name`
  - Examples: `fix/multiplayer-tests`, `fix/typing-game-improvements`

- **`test/*`**: Testing improvements and test-related changes
  - Branch from: `main`
  - Merge to: `main` via Pull Request
  - Naming: `test/descriptive-name`

### Branch Protection Rules

The `main` branch is protected with the following rules:
- Require pull request reviews before merging
- Dismiss stale PR reviews when new commits are pushed
- Require status checks to pass before merging
- Restrict pushes that create merge commits

### Commit Message Convention

We follow **Conventional Commits** specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process, auxiliary tools, libraries

**Examples:**
```bash
feat: add user authentication system
fix: resolve multiplayer synchronization issue
docs: update deployment instructions
chore: bump version to 0.8.1 [skip ci]
```

### Version Management

We use **Semantic Versioning** (SemVer):
- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features (backward compatible)
- **Patch** (0.0.X): Bug fixes (backward compatible)

Version bumps are automated via GitHub Actions:
- **Automatic**: Triggered by significant commits to `main`
- **Manual**: Via GitHub Actions workflow dispatch
- **Criteria**: Minimum 3 significant commits for automatic patch bump

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/SpeedType.git
   cd SpeedType
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   # Backend
   cd SpeedType/backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd SpeedType/backend
   npm run dev
   
   # Terminal 2: Frontend
   cd SpeedType/frontend
   npm run dev
   ```

## Code Review Standards

### Review Criteria

All pull requests must meet the following standards:

#### ✅ Code Quality
- [ ] Code follows project conventions and style guide
- [ ] Functions and variables have descriptive names
- [ ] Code is well-commented where necessary
- [ ] No unnecessary complexity or over-engineering
- [ ] Error handling is appropriate and consistent

#### ✅ Functionality
- [ ] Feature works as described in PR description
- [ ] No breaking changes to existing functionality
- [ ] All edge cases are handled
- [ ] Performance considerations are addressed

#### ✅ Testing
- [ ] New code includes appropriate tests
- [ ] All existing tests pass
- [ ] Test coverage is maintained or improved
- [ ] Integration tests pass for multiplayer features

#### ✅ Documentation
- [ ] README updated if user-facing changes
- [ ] API documentation updated if backend changes
- [ ] Comments explain complex business logic
- [ ] Migration guides provided for breaking changes

### Review Process

1. **Self Review**: Author reviews their own code before requesting review
2. **Peer Review**: At least one team member reviews the code
3. **Testing**: Manual testing of the feature/fix
4. **Approval**: Required before merge to `main`

### Review Timeline

- **Response Time**: Initial review within 24-48 hours
- **Follow-up**: Address feedback within 2-3 business days
- **Merge**: After approval and passing CI/CD checks

## Pull Request Process

### 1. Preparation

Before creating a PR:
- Ensure your branch is up to date with `main`
- Run tests locally and ensure they pass
- Test your changes in development environment
- Write clear commit messages

### 2. Creating the Pull Request

**PR Title Format:**
```
[Type] Brief description of changes

Examples:
[Feature] Add user authentication system
[Fix] Resolve multiplayer synchronization issue
[Docs] Update contributing guidelines
```

**PR Description Template:**
```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] No regressions identified

## Screenshots/Videos
If applicable, add screenshots or videos demonstrating the changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 3. Review and Feedback

- **Address all feedback** before requesting re-review
- **Keep discussions respectful** and focused on the code
- **Ask questions** if feedback is unclear
- **Update PR description** if scope changes

### 4. Merging

**Merge Requirements:**
- ✅ At least 1 approval from code owner
- ✅ All CI/CD checks pass
- ✅ No merge conflicts
- ✅ Branch is up to date with `main`

**Merge Strategy:**
- **Squash and merge** for feature branches
- **Preserve meaningful commit history**
- **Delete branch** after merge

## Coding Standards

### Frontend (React/JavaScript)

```javascript
// Use functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleClick = useCallback(() => {
    setState(newValue);
  }, [dependency]);
  
  return (
    <div className="my-component">
      {/* JSX content */}
    </div>
  );
};

// Export at bottom
export default MyComponent;
```

### Backend (Node.js/TypeScript)

```javascript
// Use clear function names and proper error handling
const handleRaceProgress = async (socket, data) => {
  try {
    const { roomId, progress } = data;
    
    if (!validateRoomId(roomId)) {
      throw new Error('Invalid room ID');
    }
    
    // Process race progress
    const updatedRace = await updateRaceProgress(roomId, progress);
    
    // Emit to all players in room
    socket.to(roomId).emit('raceUpdate', updatedRace);
    
  } catch (error) {
    logger.error('Race progress error:', error);
    socket.emit('error', { message: error.message });
  }
};
```

### Style Guidelines

- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Maximum 100 characters
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Files**: kebab-case for file names
- **CSS**: BEM methodology for class names

## Testing Requirements

### Frontend Tests
```bash
cd SpeedType/frontend
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Backend Tests
```bash
cd SpeedType/backend
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:integration # Run integration tests
```

### Test Coverage Requirements
- **Unit Tests**: Minimum 80% coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user journeys

### Testing Multiplayer Features
- Test with multiple concurrent connections
- Verify real-time synchronization
- Test edge cases (network interruptions, rapid inputs)
- Load testing for race rooms

## Deployment Process

### Automated Deployment

**Frontend (GitHub Pages)**
- Triggers: Push to `main` with frontend changes
- Build: Vite production build
- Deploy: GitHub Pages with custom domain
- URL: https://speedtype.robocat.ai

**Backend (Railway)**
- Triggers: Push to `main` with backend changes
- Build: Node.js production build
- Deploy: Railway platform
- URL: https://speedtype-backend-production.up.railway.app

### Version Management

**Automatic Version Bumps**
- Triggered by significant commits to `main`
- Creates git tags and updates package.json
- Follows semantic versioning

**Manual Version Bumps**
```bash
# Via GitHub Actions
# Go to Actions → Version Bump → Run workflow
# Select bump type: patch, minor, major
```

### Deployment Verification

After deployment:
1. **Frontend**: Check https://speedtype.robocat.ai loads correctly
2. **Backend**: Verify health endpoint responds
3. **Integration**: Test end-to-end functionality
4. **Performance**: Monitor for any degradation

## Getting Help

### Resources
- **Documentation**: Check `/docs` folder for technical guides
- **Issues**: Search existing GitHub issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions

### Contact
- **Maintainer**: [@alex-iurco](https://github.com/alex-iurco)
- **Project**: https://github.com/alex-iurco/SpeedType

### Reporting Issues
When reporting bugs:
1. **Search existing issues** first
2. **Use issue templates** when available
3. **Provide reproduction steps**
4. **Include environment details**
5. **Add screenshots/videos** if helpful

---

Thank you for contributing to SpeedType! Your help makes this project better for everyone. 🏁🚀
