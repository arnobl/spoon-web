package spoon.ast.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.StringJoiner;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import spoon.ast.api.SpoonAST;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class SpoonASTImpl implements SpoonAST {
	private String label;
	private String tooltip;
	private int startPosition;
	private int endPosition;
	@XmlTransient
	private Optional<SpoonAST> parent;
	@XmlElement(type=SpoonASTImpl.class)
	private List<SpoonAST> children;

	SpoonASTImpl() {
		super();
	}

	public SpoonASTImpl(final String label, final String tooltip, final int startPosition, final int endPosition) {
		super();
		this.label = label.toString();
		this.tooltip = tooltip;
		this.startPosition = startPosition;
		this.endPosition = endPosition;
		parent = Optional.empty();
		children = new ArrayList<>();
	}

	@Override
	public @NotNull String getLabel() {
		return label;
	}

	@Override
	public int getStartPosition() {
		return startPosition;
	}

	@Override
	public int getEndPosition() {
		return endPosition;
	}

	@Override
	public @NotNull String getTooltip() {
		return tooltip;
	}

	@Override
	public @NotNull List<SpoonAST> getChildren() {
		return Collections.unmodifiableList(children);
	}

	@Override
	public void addChild(final @NotNull SpoonAST node) {
		if(!children.contains(node)) {
			children.add(node);
			node.setParent(this);
		}
	}

	@Override
	public void removeChild(final SpoonAST node) {
		if(children.contains(node)) {
			children.remove(node);
			node.setParent(null);
		}
	}

	@Override
	public @NotNull Optional<SpoonAST> getParent() {
		return Optional.empty();
	}

	@Override
	public void setParent(final @Nullable SpoonAST node) {
		if(parent.orElse(null) != node) {
			parent.ifPresent(p -> p.removeChild(this));
			parent = Optional.ofNullable(node);
			if(node != null) {
				node.addChild(this);
			}
		}
	}

	@Override
	public String toString() {
		return new StringJoiner(", ", "SpoonASTImpl[", "]")
			.add("label=" + label)
			.add("tooltip='" + tooltip + "'")
			.add("startPosition" + "=" + startPosition)
			.add("endPosition=" + endPosition)
			.add("children=" + children)
			.toString();
	}
}
